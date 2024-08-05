import { createSlice } from '@reduxjs/toolkit'
import commentService from '../../services/comments'
import { showNotification } from './notifySlice'

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    setComments: (state, action) => {
      return action.payload
    },
    appendComment: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { setComments, appendComment } = commentSlice.actions

const commentReducer = commentSlice.reducer
export default commentReducer

export function initializeComments (blogId) {
  return async (dispatch) => {
    try {
      const comments = await commentService.getCommentsOfBlog(blogId)
      dispatch(setComments(comments))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export function addComment (newComment, blogId) {
  return async (dispatch) => {
    try {
      const comment = await commentService.create(newComment, blogId)
      dispatch(appendComment(comment))
      dispatch(showNotification('Successfully comment created', 'success'))
    } catch (error) {
      console.error(error.message)
    }
  }
}
