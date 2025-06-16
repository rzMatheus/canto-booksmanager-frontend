// src/graphql/books/book.queries.ts
import {gql} from '@apollo/client'

export const GET_BOOKS = gql`
    query FindAllBooks($filters: Filters) {
        findAllBooks(filters: $filters) {
            id
            code
            title
            author {
                id
                name
            }
            publishedDate
            genre
            format
            hasAudiobook
            summary
        }
    }
`

export const GET_BOOK = gql`
    query FindBookByID($id: ID!) {
        findBookByID(id: $id) {
            id
            code
            title
            author {
                id
                name
            }
            publishedDate
            genre
            format
            hasAudiobook
            summary
        }
    }
`

export const CREATE_BOOK = gql`
    mutation CreateBook($book: CreateBookInput!) {
        createBook(book: $book)
    }
`

export const UPDATE_BOOK = gql`
    mutation UpdateBook($book: UpdateBookInput!) {
        updateBook(book: $book) {
            id
            code
            title
            author {
                id
                name
            }
            publishedDate
            genre
            format
            hasAudiobook
            summary
        }
    }
`

export const DELETE_BOOK = gql`
    mutation DeleteBook($id: ID!) {
        deleteBook(id: $id)
    }
`