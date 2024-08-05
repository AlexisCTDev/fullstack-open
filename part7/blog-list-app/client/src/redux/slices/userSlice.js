import { createSlice } from '@reduxjs/toolkit'
import userService from '../../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    }
  }
})

export const { setUsers } = userSlice.actions

const usersReducer = userSlice.reducer
export default usersReducer

export function initializeUsers () {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      dispatch(setUsers(users))
    } catch (error) {
      console.error(error.message)
    }
  }
}
