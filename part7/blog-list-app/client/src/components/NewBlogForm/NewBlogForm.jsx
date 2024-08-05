import { useField } from '../../hooks/useField'
import { useBlogService } from '../../hooks/useBlogs'
import { Button, TextField } from '@mui/material'

export default function NewBlogForm ({ onCreate }) {
  const { createBlog } = useBlogService()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    onCreate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new blog:</h2>
      <TextField
        {...title}
        id='standard-basic'
        label='title'
        variant='standard'
      />
      <TextField
        {...author}
        id='standard-basic'
        label='author'
        variant='standard'
      />
      <TextField {...url} id='standard-basic' label='url' variant='standard' />
      <Button type='submit' variant='contained' data-testid='create-blog-btn'>
        Create
      </Button>
    </form>
  )
}
