import { useLogin } from '../../hooks/useLogin'
import { useBlogService } from '../../hooks/useBlogs'
import { Button } from '@mui/material'

export default function Blog ({ blog }) {
  const { loggedUser } = useLogin()
  const { deleteBlogById, handleLikeSubmit } = useBlogService()

  const renderUserOptions = () => {
    return (
      <div>
        <Button
          variant='outlined'
          color='error'
          type='button'
          onClick={() => deleteBlogById(blog.id)}
        >
          delete
        </Button>
      </div>
    )
  }

  if (!blog) {
    return (
      <div>
        <p>Blog not found</p>
      </div>
    )
  }

  return (
    <article>
      <h2>{blog.title}</h2>

      <div>
        <a href={blog.url} target='_blank' rel='noreferrer'>
          {blog.url}
        </a>
        <br />
        <div>
          {blog.likes}
          <Button
            type='submit'
            data-testid='like-button'
            variant='outlined'
            onClick={() => handleLikeSubmit(blog)}
          >
            Like
          </Button>
        </div>
      </div>
      <em>added by {blog.user.username}</em>
      {loggedUser?.username === blog.user.username && renderUserOptions()}
    </article>
  )
}
