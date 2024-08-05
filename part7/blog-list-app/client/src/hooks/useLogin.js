import { useEffect } from 'react'
import { loginWithCredentials, logoutUser } from '../redux/slices/authSlice'
import { useAppDispatch, useAppSelector } from './store'
import blogService from '../services/blogs'
import { loggedUserKey } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import { useUsers } from './useUsers'
import commentService from '../services/comments'

export function useLogin () {
  const navigate = useNavigate()
  const loggedUser = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const { users } = useUsers()

  useEffect(() => {
    const savedUser = window.localStorage.getItem(loggedUserKey)
    if (savedUser) {
      const userObject = JSON.parse(savedUser)
      blogService.setToken(userObject.token)
      commentService.setToken(userObject.token)
    }
  }, [])

  const signIn = async (credentials) => {
    const userLogged = await dispatch(loginWithCredentials(credentials))
    const user = users.find((user) => user.username === userLogged.username)
    if (user) {
      navigate(`/users/${user.id}`)
    }
  }

  const signOut = () => {
    dispatch(logoutUser())
  }

  return { loggedUser, signIn, signOut }
}
