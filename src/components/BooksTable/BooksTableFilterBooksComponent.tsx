import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import {useLazyQuery} from "@apollo/client";
import {GET_BOOKS} from "@/api/graphql/books/books.queries.ts";
import {setBooksAsync} from "@/features/state/books/booksSlice.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/features/state/store.redux.ts";
import {DatePicker} from "@/components/ui/date-picker.tsx";

interface BooksTableFilterBooksComponentProps {
    isLoading: boolean,
}

export function BooksTableFilterBooksComponent({isLoading, }: BooksTableFilterBooksComponentProps) {
    const [filterType, setFilterType] = useState<string | null>();
    const [filterValue, setFilterValue] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const [getBooks, { data }] = useLazyQuery(GET_BOOKS)


    const handleInputChange = useDebouncedCallback((value: string) => {
        console.log( (filterType && value) ? {
            [filterType ? filterType : ""]: value.toLowerCase().trim()
        } : {})
        getBooks({
            variables: {
                filters: (filterType && value) ? {
                    [filterType ? filterType : ""]: value.toLowerCase().trim()
                } : {},
            }
        })

    }, 500)

    useEffect(() => {
        if (data?.findAllBooks) {
            dispatch(setBooksAsync(data.findAllBooks));
        }
    }, [data, dispatch]);

    useEffect(() => {
        handleInputChange(filterValue);
    }, [filterValue]);

    return(
        <div className="flex flex-row gap-3 items-center">
            <p>Filter: </p>
            <Select
                disabled={isLoading}
                onValueChange={(v) => {
                    setFilterType(v)
                    setFilterValue("")
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="identifier">Identifier</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="author">Author</SelectItem>
                        <SelectItem value="publishedDate">Published date</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            {
                filterType === "publishedDate" ?
                    <DatePicker onChange={(value: any) => {
                        setFilterValue(value)
                        handleInputChange(value)
                    }} />
                 :
                    <Input className="max-w-[300px]"
                            placeholder={`${filterType ? `Search by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}` : "Select a filter type"}`}
                        disabled={!filterType}
                        value={filterValue}
                        onChange={(e) => {
                            setFilterValue(e.target.value)
                            handleInputChange(e.target.value)
                        }}
                    />
            }


        </div>
    )
}