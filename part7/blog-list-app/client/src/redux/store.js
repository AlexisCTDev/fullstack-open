import { configureStore } from '@reduxjs/toolkit'
import notifyReducer from './slices/notifySlice'
import blogReducer from './slices/blogSlice'
import authReducer from './slices/authSlice'
import usersReducer from './slices/userSlice'
import commentReducer from './slices/commentSlice'

const store = configureStore({
  reducer: {
    notify: notifyReducer,
    blogs: blogReducer,
    auth: authReducer,
    users: usersReducer,
    comments: commentReducer
  }
})

export default store
