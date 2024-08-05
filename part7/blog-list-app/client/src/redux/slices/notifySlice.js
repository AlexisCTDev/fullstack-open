import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: undefined
}

const notifySlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { message, type } = action.payload
      state.message = message
      state.type = type
    },
    clearNotification: (state) => {
      state.message = null
      state.type = undefined
    }
  }
})

export const { setNotification, clearNotification } = notifySlice.actions

const notifyReducer = notifySlice.reducer
export default notifyReducer

export function showNotification (message, type) {
  return (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }
}
