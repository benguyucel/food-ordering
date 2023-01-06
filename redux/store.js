import { configureStore } from "@reduxjs/toolkit";
import cardReducer from './cartSlice'
import categorySlice from "./categorySlice";
export const store = configureStore({
    reducer: {
        cart: cardReducer,
        category:categorySlice
    },
})