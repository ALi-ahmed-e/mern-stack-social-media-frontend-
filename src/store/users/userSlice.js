import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const togglefollowUser = createAsyncThunk('users/toggle follow', async (id, { rejectWithValue, getState }) => {

    try {
        // toggle follow users
        const res = await axios.post(`/api/user/follow-user/${id}`,{}, { withCredentials: true })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

const initstate = {
    posts: [],
    page: 1,
    docs: 0,
    error: null
}

const userSlice = createSlice({
    name: "users",
    initialState: initstate,
     extraReducers: (builder) => {
        builder.addCase(togglefollowUser.fulfilled, (state, action) => {

            console.log(action.payload)
        })
    }
})



export default userSlice.reducer
// export const   = userSlice.actions
