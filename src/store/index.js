import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import postsReducer from './posts/postsSlice'
import userReducer from './users/userSlice'
import themeReducer from './theme/themeSlice'

const Store = configureStore({
    reducer:{Auth:authReducer,Posts:postsReducer,User:userReducer,theme:themeReducer}
})




export default Store;