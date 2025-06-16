import {z} from "zod";
import {BookFormatType, BookGenreType} from "@/types/book.type.ts";

export const bookFormZodSchema = z.object({
    bookTitle: z.string().min(1, {
        message: "Title must be at least 1 characters",
    }),
    bookAuthor: z.string().min(3, {
        message: "Title must be at least 3 characters",
    }),

    bookPublishedDate: z.date({
        required_error: "Please select a date",
    }),

    bookGenre: z.enum(BookGenreType.map(val => val.value) as [string, ...string[]]
        , {
            required_error: "Please select a genre"
        }),

    bookFormat: z.enum(BookFormatType.map(val => val.value) as [string, ...string[]]
        , {
            required_error: "Please select a format"
        }),

    bookHasAudiobook: z.boolean().or(z.string().transform(arg => !!arg)).optional().default(false),

    bookDescription: z.string().min(10, {
        message: "The summary must be at least 10 characters",
    }),
})

export const bookFormZodClearedDefaultValues = {
    bookTitle: "",
    bookAuthor: "",
    bookPublishedDate: "",
    bookGenre: "",
    bookFormat: "",
    bookHasAudiobook: false,
    bookDescription: ""
}