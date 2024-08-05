import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store'
import {
  addBlog,
  initializeBlogs,
  removeBlogById,
  submitLike
} from '../redux/slices/blogSlice'
import { useLogin } from './useLogin'
import { showNotification } from '../redux/slices/notifySlice'
import { useNavigate } from 'react-router-dom'
import { useUsers } from './useUsers'

export function useBlogService () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loggedUser } = useLogin()
  const { users } = useUsers()
  const user = users.find((user) => user.username === loggedUser?.username)

  const createBlog = async (blog) => {
    const createdBlog = await dispatch(addBlog(blog))
    if (createdBlog) {
      navigate(`/users/${createdBlog.user.id}`)
    }
  }

  const deleteBlogById = async (id) => {
    const confirm = window.confirm('Are you sure to delete this blog?')
    if (!confirm) return
    const deleted = await dispatch(removeBlogById(id))
    if (deleted) navigate(`/users/${user.id}`)
  }

  const handleLikeSubmit = (blog) => {
    if (!loggedUser) {
      return dispatch(showNotification('You have not logged in', 'error'))
    }
    dispatch(submitLike(blog))
  }

  return { createBlog, deleteBlogById, handleLikeSubmit }
}

export const useBlogsValue = () => {
  const blogs = useAppSelector((state) => state.blogs)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return blogs
}
