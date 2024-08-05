import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store'
import { initializeUsers } from '../redux/slices/userSlice'
import userService from '../services/users'

export function useUsers () {
  const users = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const getUserById = async (id) => {
    try {
      return await userService.getById(id)
    } catch (error) {
      console.error(error.message)
    }
  }

  return { users, getUserById }
}
