import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const getCategories = createAsyncThunk('categories/getCategories', async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    return res.data
})

const initialState = {
    categories: [],
    loading: 'idle',
}
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getCategories.fulfilled, (state, action) => {
            // Add user to the state array
            state.loading = "succeeded"
            state.categories = action.payload
        })
    },
})

export default categoriesSlice.reducer
