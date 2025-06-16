export type BookType = {
    id: string,
    code: string
    title: string,
    author: AuthorType,
    genre: string,
    format: string,
    publishedDate: string,
    hasAudiobook: boolean,
    summary: string,
}

export type AuthorType = {
    id: string,
    name: string,
}

export const BookGenreType =[
    { value: "ACTION", label: "Action" },
    { value: "COMEDY", label: "Comedy" },
    { value: "DRAMA", label: "Drama" },
    { value: "HORROR", label: "Horror" },
    { value: "SCIENCE_FICTION", label: "Science Fiction" }
]

export const BookFormatType =[
    { value: "PAPERBOOK", label: "Paperbook" },
    { value: "EBOOK", label: "Ebook" }
]