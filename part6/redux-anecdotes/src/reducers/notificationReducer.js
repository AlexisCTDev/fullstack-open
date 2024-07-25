import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification (state, action) {
      return action.payload
    },
    clearNotification (state, action) {
      return null
    }
  }
})

export const { createNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export function setNotification (text, timeout) {
  return (dispatch) => {
    dispatch(createNotification(text))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}
