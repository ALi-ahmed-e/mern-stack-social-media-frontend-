import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'






export const getSomeonePosts = createAsyncThunk('posts/get someone posts', async (data, { rejectWithValue, getState }) => {
    const number_of_docs = getState().Posts.docs
    try {
        //get timline post
        if (data.page != 1) {
            if (data.page > 1 && data.page <= number_of_docs) {
                const res = await axios.get(`/api/posts/get-someone-posts/${data.id}?page=${data.page}&limit=10`, {}, { withCredentials: true })
                return res.data
            } else {
                return 'wrong action'
            }
        } else {

            const res = await axios.get(`/api/posts/get-someone-posts/${data.id}?page=${data.page}&limit=10`, {}, { withCredentials: true })
            return res.data
        }

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

export const getPosts = createAsyncThunk('posts/get posts', async (page, { rejectWithValue, getState }) => {
    const number_of_docs = getState().Posts.docs

    try {
        //get timline post
        if (page != 1) {
            if (page > 1 && page <= number_of_docs) {
                const res = await axios.get(`/api/posts/get-timeline-post/?page=${page}&limit=10`, {}, { withCredentials: true })
            
                return res.data
            } else {
                return 'wrong action'
            }
        } else {

            const res = await axios.get(`/api/posts/get-timeline-post/?page=${page}&limit=10`, {}, { withCredentials: true })

            return res.data
        }

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})


export const addPost = createAsyncThunk('posts/Add post', async (data, { rejectWithValue, getState }) => {

    try {
        //add post
        const res = await axios.post(`/api/posts/add-post`, data, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

export const deletePost = createAsyncThunk('posts/delete post', async (post, { rejectWithValue, getState }) => {

    try {
        //delete post
        await axios.delete(`/api/posts/delete-post/${post._id}`, { withCredentials: true })

        return post

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

export const toggleLikePost = createAsyncThunk('posts/like post', async (post, { rejectWithValue, getState }) => {

    try {
        //toggle like post
        await axios.put(`/api/posts/like-post/${post._id}`, {}, { withCredentials: true })

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

export const addcommenttopost = createAsyncThunk('posts/addComment post', async (data, { rejectWithValue, getState }) => {

    try {
        //add comment like post
        const res = await axios.put(`/api/posts/comment-post/${data.post._id}`, { comment: data.comment }, { withCredentials: true })

        return { newpost: res.data.message, prevPost: data.post }
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})


export const deletecommenttopost = createAsyncThunk('posts/delete Comment post', async (data, { rejectWithValue, getState }) => {

    try {
        //add comment like post
        const res = await axios.put(`/api/posts/delete-comment-post/${data.post._id}/${data.comment._id}`, { withCredentials: true })

        return { newpost: res.data.message, prevPost: data.post }
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})






const initstate = {
    posts: [],
    page: 1,
    docs: 0,
    error: null,
    isLoading:false,
}

const PostsSlice = createSlice({
    name: "Auth",
    initialState: initstate,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {

        builder.addCase(addPost.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.isLoading = false
            state.posts.unshift(action.payload)
        })
        builder.addCase(addPost.rejected, (state, action) => {
            state.isLoading = false
            state.error.err = action.payload
        })


        builder.addCase(getPosts.fulfilled, (state, action) => {
            if (action.payload != 'wrong action') {


                state.docs = Math.ceil((action.payload.number_of_docs / 10))
                state.page = Number.parseInt(action.payload.page)
                state.posts = action.payload.posts
            }
        })
        builder.addCase(getPosts.rejected, (state, action) => {

            state.error = action.payload
        })

        builder.addCase(getSomeonePosts.fulfilled, (state, action) => {
            if (action.payload != 'wrong action') {


                state.docs = Math.ceil((action.payload.number_of_docs / 10) + 1)
                state.page = Number.parseInt(action.payload.page)
                state.posts = action.payload.posts
            }
        })
        builder.addCase(getSomeonePosts.rejected, (state, action) => {

            state.error = action.payload
        })



        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts.splice(state.posts.findIndex(pst => pst._id == action.payload._id), 1)
        })

        builder.addCase(deletePost.rejected, (state, action) => {

            state.error = action.payload
        })



        builder.addCase(addcommenttopost.fulfilled, (state, action) => {
            state.posts.splice(state.posts.findIndex(pst => pst._id == action.payload.prevPost._id), 1, action.payload.newpost)
        })

        builder.addCase(addcommenttopost.rejected, (state, action) => {

            state.error = action.payload
        })

        builder.addCase(deletecommenttopost.fulfilled, (state, action) => {
            state.posts.splice(state.posts.findIndex(pst => pst._id == action.payload.prevPost._id), 1, action.payload.newpost)
        })

        builder.addCase(deletecommenttopost.rejected, (state, action) => {

            state.error = action.payload
        })


    }
})


export default PostsSlice.reducer
export const { loginSuccess } = PostsSlice.actions
