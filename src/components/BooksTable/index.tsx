import {Check, Plus, X} from "lucide-react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {BooksTableNewBookComponent} from "@/components/BooksTable/BooksTableNewBookComponent.tsx";
import type {AppDispatch, RootState} from "@/features/state/store.redux.ts";
import {useDispatch, useSelector} from "react-redux";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {CustomAlertDialog} from "@/components/CustomAlertDialog";
import {useMutation} from "@apollo/client";
import {DELETE_BOOK, GET_BOOKS} from "@/api/graphql/books/books.queries.ts";
import {showToast} from "@/lib/utils.ts";
import {setBooksAsync} from "@/features/state/books/booksSlice.ts";
import {BooksTableFilterBooksComponent} from "@/components/BooksTable/BooksTableFilterBooksComponent.tsx";

export function BooksTable(){
    const dispatch = useDispatch<AppDispatch>();
    const [deleteBook] = useMutation(DELETE_BOOK, {
        refetchQueries: [{
            query: GET_BOOKS,
            variables: {
                filters: {}
            }
        }],
        onCompleted: (data) => {
            if (data.findAllBooks){
                dispatch(setBooksAsync(data.findAllBooks))
            }
        }
    })

    const { items: books, isLoading } = useSelector((state: RootState) => state.books);

    const handleDeleteBook = async (bookId: string) => {
        try{
            await deleteBook({
                variables: { id: bookId }
            })

            showToast("Success", "Book deleted successfully")
        }catch (e) {
            showToast("Failed", "The book was not deleted. Please try again later.")
            console.error(e)
        }
    }

    return (
        <div className="border rounded-lg p-0 m-6">
        <div className="border-b flex flex-row gap-3 p-4 items-center justify-between flex-wrap">
            <BooksTableFilterBooksComponent isLoading={isLoading} />
            <BooksTableNewBookComponent triggerText="Add new book" triggerIcon={() => <Plus />} />
        </div>
            {isLoading ?
                <div className="flex flex-col items-center p-1 gap-2">
                    <Skeleton className="h-12 w-full" />
                    {Array.from({length: 10}).map((_, index) => <Skeleton key={index} className="h-8 w-full" />)}
                </div> :
        <Table>
            <TableCaption>A pagination will be available in the future...</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Identifier</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Published date</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Audiobook</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                books?.map((book, key) => (
                        <TableRow key={key}>
                            <TableCell className="font-medium rounded-lg">{book.code}</TableCell>
                            <TableCell className="rounded-lg">{book.title}</TableCell>
                            <TableCell className="rounded-lg">{book.author?.name}</TableCell>
                            <TableCell className="rounded-lg">{book.publishedDate}</TableCell>
                            <TableCell className="rounded-lg">{book.genre}</TableCell>
                            <TableCell className="rounded-lg">{book.format}</TableCell>
                            <TableCell className="rounded-lg justify-center">{book.hasAudiobook ? <Check color="green" size={24}/> : <X color="red" size={24}/> } </TableCell>
                            <TableCell className="rounded-lg"> <BooksTableNewBookComponent triggerText="Modify" triggerVariant="outline" modifyTargetId={book.id} key={`${key}-nbc`}  /> <CustomAlertDialog key={`${key}-cad`} buttonTriggerText="Remove" dialogTitle="Are you sure?" dialogDescription={`This action cannot be undone. The book ${book.title} from ${book.author?.name} will be deleted permanently.`} onConfirmAction={() => handleDeleteBook(book.id)}  /></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>}

    </div>)
}
