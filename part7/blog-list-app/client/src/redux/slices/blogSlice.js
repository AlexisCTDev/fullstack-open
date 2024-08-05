import { createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'
import { showNotification } from './notifySlice'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
    },
    giveLike: (state, action) => {
      const { payload } = action
      const blogIndex = state.findIndex((blog) => blog.id === payload.id)
      if (blogIndex >= 0) {
        state[blogIndex].likes += 1
      }
    }
  }
})

export const { setBlogs, appendBlog, removeBlog, giveLike } = blogSlice.actions

const blogReducer = blogSlice.reducer
export default blogReducer

export function initializeBlogs () {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export function addBlog (blog) {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      const blogToAdd = await blogService.getById(newBlog.id)
      dispatch(appendBlog(blogToAdd))
      dispatch(showNotification('Successfully created', 'success'))
      return blogToAdd
    } catch (error) {
      console.error(error)
      dispatch(showNotification('Failed to create a new blog', 'error'))
      return false
    }
  }
}

export function removeBlogById (id) {
  return async (dispatch) => {
    try {
      await blogService.deleteOne(id)
      dispatch(removeBlog(id))
      dispatch(showNotification('Successfully removed', 'success'))
      return true
    } catch (error) {
      console.error(error.message)
      dispatch(showNotification('Failed to remove the blog', 'error'))
      return false
    }
  }
}

export function submitLike (blogWithUser) {
  const { user, ...blog } = blogWithUser
  blog.likes += 1

  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      dispatch(giveLike(updatedBlog))
    } catch (error) {
      console.error(error.message)
      dispatch(showNotification(error.message, 'error'))
    }
  }
}
