import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

export default function App () {
  const blogFormRef = useRef()
  const loginFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [loggedUser, setLoggedUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('loggedBlogAppUser')

    if (savedUser) {
      const userObject = JSON.parse(savedUser)
      setLoggedUser(userObject)
      blogService.setToken(userObject.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const returnedUser = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(returnedUser)
      )
      blogService.setToken(returnedUser.token)
      setLoggedUser(returnedUser)
      loginFormRef.current.toggleVisibility()
    } catch (error) {
      setNotification({
        type: 'error',
        text: 'Wrong username or password'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      console.log('add blog fn in app.jsx debug loggerUser:', loggedUser)
      setNotification({
        type: 'success',
        text: `A new blog ${returnedBlog.title} added`
      })
      setTimeout(() => {
        setNotification(null)
      }, 2500)
    } catch (error) {
      console.error(error.response.data.error)
    }
  }

  const renderLoginForm = () => {
    return (
      <Togglable buttonLabel='login' ref={loginFormRef}>
        <LoginForm onSumbit={handleLogin} />
      </Togglable>
    )
  }

  const renderCreateBlogForm = () => {
    return (
      <Togglable buttonLabel='Create new' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setLoggedUser(null)
  }

  const handleLikeSubmit = async (id) => {
    if (!loggedUser) {
      setNotification({
        type: 'error',
        text: 'You have not logged in'
      })
      return setTimeout(() => {
        setNotification(null)
      }, 2500)
    }

    try {
      const blog = blogs.find((b) => b.id === id)
      const newBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
      }

      await blogService.update(id, newBlog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleDeleteBlog = async (id) => {
    const confirm = window.confirm('Are you sure to delete this blog?')

    if (!confirm) return

    try {
      await blogService.deleteOne(id)
      setBlogs(await blogService.getAll())
      setNotification({
        type: 'success',
        text: 'Successfully removed'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditBlog = async (newBlog) => {
    try {
      const blog = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      }

      await blogService.update(newBlog.id, blog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setNotification({
        type: 'success',
        text: 'blog updated successfully'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <h1>blogs</h1>

      {notification && <Notification notification={notification} />}

      {loggedUser && (
        <div>
          <p>
            {loggedUser.name} logged in{' '}
            <button onClick={handleLogout}>Logout</button>
          </p>
        </div>
      )}

      {!loggedUser ? renderLoginForm() : renderCreateBlogForm()}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeSubmit={() => handleLikeSubmit(blog.id)}
          loggedUser={loggedUser}
          editBlog={handleEditBlog}
          deleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  )
}
