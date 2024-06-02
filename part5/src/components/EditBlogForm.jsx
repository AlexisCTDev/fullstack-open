import { useRef, useState } from 'react'
import Togglable from './Togglable'

export function EditBlogForm ({ blog, editBlog }) {
  if (!blog) return null

  const initialState = blog
  const editBlogFormRef = useRef()
  const [newBlog, setNewBlog] = useState(initialState)

  const saveBlog = (event) => {
    event.preventDefault()
    setNewBlog(newBlog)
    editBlog(newBlog)
    editBlogFormRef.current.toggleVisibility()
  }

  const handleChange = (event) => {
    event.preventDefault()
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
  }

  const resetState = () => {
    setNewBlog(initialState)
  }

  return (
    <Togglable
      buttonLabel='edit'
      afterCancel={resetState}
      ref={editBlogFormRef}
    >
      <form onSubmit={saveBlog}>
        <h2>Edit blog</h2>
        <label style={{ display: 'block' }}>
          title:
          <input
            type='text'
            name='title'
            value={newBlog.title}
            onChange={handleChange}
            placeholder='write title blog here'
          />
        </label>
        <label style={{ display: 'block' }}>
          author:
          <input
            type='text'
            name='author'
            value={newBlog.author}
            onChange={handleChange}
          />
        </label>
        <label style={{ display: 'block' }}>
          url:
          <input
            type='text'
            name='url'
            value={newBlog.url}
            onChange={handleChange}
          />
        </label>
        <button type='submit' data-testid='edit-blog-btn'>
          Save
        </button>
      </form>
    </Togglable>
  )
}
