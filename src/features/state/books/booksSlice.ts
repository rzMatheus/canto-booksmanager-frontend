import type {BookType} from "@/types/book.type.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface BooksState {
    items: BookType[],
    isLoading: boolean,
    error: string | null,
}

const initialState: BooksState = {
    items: [],
    isLoading: false,
    error: null
};

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<BookType[]>) => {
            state.items = action.payload;
        },
        addBook: (state, action: PayloadAction<BookType>) => {
            state.items.push(action.payload);
        },
        deleteBook: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(book => book.id !== action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(setBooksAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(setBooksAsync.fulfilled, (state, action: PayloadAction<BookType[]>) => {
                state.items = action.payload;
                state.isLoading = false;
            })
            .addCase(setBooksAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Failed to fetch books.';
            });

    }
})

export const setBooksAsync = createAsyncThunk(
    "books/setBooksAsync",
    async (promise: BookType[]) => {
        return promise;
    }
)


export const {setBooks, addBook, deleteBook} = booksSlice.actions;

export default booksSlice.reducer;


//EACH SLICE IS RESPONSIBLE FOR EACH STATE
//REDUX MAKE A COPY AND THEN REPLACE THE ENTIRE STATE (like when I want to change a json state using useState)