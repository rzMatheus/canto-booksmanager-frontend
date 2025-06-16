import bookReducer from "./books/booksSlice.ts";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        books: bookReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;