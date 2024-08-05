import { createSlice } from '@reduxjs/toolkit'
import { loggedUserKey } from '../../utils/constants'
import loginService from '../../services/login'
import blogService from '../../services/blogs'
import { showNotification } from './notifySlice'

const loggedUser =
  JSON.parse(window.localStorage.getItem(loggedUserKey)) || null

if (loggedUser) {
  blogService.setToken(loggedUser.token)
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loggedUser,
  reducers: {
    login: (state, action) => {
      const { payload } = action
      window.localStorage.setItem(loggedUserKey, JSON.stringify(payload))
      blogService.setToken(payload.token)
      return payload
    },
    logout: (state) => {
      window.localStorage.removeItem(loggedUserKey)
      return null
    }
  }
})

const { login, logout } = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer

export function loginWithCredentials (credentials) {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(login(user))
      return user
    } catch (error) {
      console.error(error.message)
      dispatch(showNotification('Invalid username or password', 'error'))
      return false
    }
  }
}

export function logoutUser () {
  return (dispatch) => {
    dispatch(logout())
  }
}
