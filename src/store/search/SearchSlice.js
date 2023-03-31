import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const searchUsers = createAsyncThunk('search/ search users', async ({query,page}, { rejectWithValue, getState }) => {


    try {
        // search Users
        const res = await axios.get(`/api/user/search-users?query=${query}&page=${page?page:1}`, {}, { withCredentials: true })
        const data = res.data
        return {...data,query}
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message)
    }

})

const initstate = {
    users: [],
    page: 1,
    docs: 0,
    query:null,
    error: null
}

const searchSlice = createSlice({
    name: "search",
    initialState: initstate,
    extraReducers: (builder) => {
        builder.addCase(searchUsers.fulfilled, (state, action) => {
            state.users = action.payload.users
            state.page = action.payload.page
            state.query = action.payload.query
            state.docs = Math.ceil((action.payload.number_of_docs / 10))

        })
    }
})



export default searchSlice.reducer
