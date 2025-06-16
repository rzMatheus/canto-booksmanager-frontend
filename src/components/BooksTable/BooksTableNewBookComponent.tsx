import {CustomDialog} from "@/components/CustomDialog";
import {CustomFormDialogContent} from "@/components/CustomDialog/CustomFormDialogContent";
import {z} from "zod";
import {CustomForm} from "@/components/CustomForm";
import {BookFormatType, BookGenreType} from "@/types/book.type.ts";
import {type ElementType, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/features/state/store.redux.ts";
import {useMutation} from "@apollo/client";
import {CREATE_BOOK, GET_BOOKS, UPDATE_BOOK} from "@/api/graphql/books/books.queries.ts";
import {format} from "date-fns";
import {setBooksAsync} from "@/features/state/books/booksSlice.ts";
import {showToast} from "@/lib/utils.ts";

interface BooksTableNewBookComponentProps {
    triggerText: string,
    triggerVariant?: any,
    triggerIcon?: ElementType,
    modifyTargetId?: string,
    onEditBookAction?: (data: any) => Promise<void>,
    onNewBookAction?: (data: any) => Promise<void>,
}

export function BooksTableNewBookComponent( {triggerText, triggerIcon: TriggerIcon, triggerVariant, modifyTargetId} :BooksTableNewBookComponentProps){
    const { items: books } = useSelector((state: RootState) => state.books);
    const dispatch = useDispatch<AppDispatch>();

    const [ createBook ] = useMutation(CREATE_BOOK, {
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
        }})
    const [updateBook] = useMutation(UPDATE_BOOK, {
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
        }})

    const [isOpen, setIsOpen] = useState(false);

    const formSchema = z.object({
        bookTitle: z.string().min(1, {
            message: "Title must be at least 1 characters",
        }),
        bookAuthor: z.string().min(3, {
                message: "Title must be at least 3 characters",
            }),

        bookPublishedDate: z.string().min(1, { message: "Please select a date"}).transform(arg => new Date(arg))
        .or(z.date({
            required_error: "Please select a valid date",
        })),

        bookGenre: z.enum(BookGenreType.map(val => val.value) as [string, ...string[]]
        , {
            errorMap: () => {
                return {
                    message: "Please select a valid genre"
                }
            }
        }),

        bookFormat: z.enum(BookFormatType.map(val => val.value) as [string, ...string[]]
            , {
                errorMap: () => {
                    return {
                        message: "Please select a valid format"
                    }
                }
            }),

        bookHasAudiobook: z.boolean().or(z.string().transform(arg => !!arg)).optional().default(false),

        bookDescription: z.string().min(10, {
            message: "The summary must be at least 10 characters",
        }),
    })
    const getCustomFormDefaultValues = () => {
        if (modifyTargetId) {
            const book = books.find(book => book.id === modifyTargetId)
            if (book) {
                return {
                    bookTitle: book.title,
                    bookAuthor: book.author.name,
                    bookPublishedDate: new Date(book.publishedDate),
                    bookGenre: BookGenreType.find(genre => genre.value === book.genre) ? book.genre : "",
                    bookFormat: BookFormatType.find(format => format.value === book.format) ? book.format : "",
                    bookHasAudiobook: book.hasAudiobook,
                    bookDescription: book.summary
                }
            }
        }

        return {
            bookTitle: "",
            bookAuthor: "",
            bookPublishedDate: "",
            bookGenre: "",
            bookFormat: "",
            bookHasAudiobook: false,
            bookDescription: ""
        }
    }

    const handleEditBookAction= async (editBookData: z.infer<typeof formSchema>) => {
        try{
            const book = books.find(book => book.id === modifyTargetId)

            if (!book) {
                throw new Error('Book to edit not found');
            }

            console.log(editBookData, book)
            await updateBook({
                variables: {
                    book: {
                        id: book?.id,
                        code: book?.code,
                        title: editBookData.bookTitle,
                        author: editBookData.bookAuthor,
                        publishedDate: format(editBookData.bookPublishedDate, 'yyyy-MM-dd'),
                        genre: editBookData.bookGenre,
                        format: editBookData.bookFormat,
                        hasAudiobook: editBookData.bookHasAudiobook,
                        summary: editBookData.bookDescription,
                    }
                }
            })
            setIsOpen(false);

            showToast(`Book has been edited successfully`, `${editBookData.bookTitle} - ${editBookData.bookAuthor}`)

        }catch (e) {
            showToast(`Failed to complete action. Please contact the support.`, `${editBookData.bookTitle} - ${editBookData.bookAuthor}`)
            console.error('Error while creating a new book', e);
        }
    }

    const handleNewBookAction= async(newBookData: z.infer<typeof formSchema>) => {
        try{
            await createBook({
                variables: {
                    book: {
                        title: newBookData.bookTitle,
                        author: newBookData.bookAuthor,
                        publishedDate: format(newBookData.bookPublishedDate, 'yyyy-MM-dd'),
                        genre: newBookData.bookGenre,
                        format: newBookData.bookFormat,
                        hasAudiobook: newBookData.bookHasAudiobook,
                        summary: newBookData.bookDescription,
                    }
                }
            })

            setIsOpen(false);

            showToast(`Book has been created successfully`, `${newBookData.bookTitle} - ${newBookData.bookAuthor}`)

        }catch (e) {
            showToast(`Failed to complete action. Please contact the support.`, `${newBookData.bookTitle} - ${newBookData.bookAuthor}`)
            console.error('Error while creating a new book', e);
        }
    }


    return(
        <CustomDialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <CustomDialog.Trigger variant={triggerVariant} buttonText={triggerText} icon={TriggerIcon} />
            {isOpen &&
            <CustomFormDialogContent.Root>
                <CustomFormDialogContent.Header title="Add a new book" description="The request will be send to our backend system" />
                    <CustomForm.Root formSchema={formSchema}
                                     defaultValues={getCustomFormDefaultValues()}
                                     onSubmitAction={modifyTargetId ? handleEditBookAction : handleNewBookAction}>
                        <CustomForm.Input formControl={formSchema} labelText="Title" name="bookTitle" defaultValue="" />
                        <CustomForm.Input formControl={formSchema} labelText="Author" name="bookAuthor" defaultValue="" />
                        <CustomForm.DatePicker formControl={formSchema} labelText="Published date" name="bookPublishedDate" />
                        <CustomForm.Select formControl={formSchema} labelText="Genre" name="bookGenre" placeholder="Select the book genre" options={BookGenreType} />
                        <CustomForm.Select formControl={formSchema} labelText="Format" name="bookFormat" placeholder="Select the book format" options={BookFormatType} />
                        <CustomForm.CheckBox formControl={formSchema} labelText="The book has also an audiobook" name="bookHasAudiobook" />
                        <CustomForm.Textarea formControl={formSchema} labelText="Summary" name="bookDescription" placeholder="Write a short description of the book"/>
                        <CustomFormDialogContent.Actions cancelActionText="Close" saveActionText="Save book" />
                    </CustomForm.Root>
            </CustomFormDialogContent.Root>   }
        </CustomDialog.Root>);
}