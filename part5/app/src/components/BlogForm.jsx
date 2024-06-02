import { useState } from 'react'

export default function BlogForm ({ createBlog }) {
  const initialState = {
    title: '',
    author: '',
    url: ''
  }
  const [newBlog, setNewBlog] = useState(initialState)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog(initialState)
  }

  const handleChange = (event) => {
    event.preventDefault()
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new blog:</h2>
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
      <button type='submit' data-testid='create-blog-btn'>
        Create
      </button>
    </form>
  )
}
