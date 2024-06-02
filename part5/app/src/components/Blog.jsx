import { useState } from 'react'
import { EditBlogForm } from './EditBlogForm'

function LoggedUserOptions ({ isLogged, children, className, style }) {
  if (!isLogged) return null

  return (
    <div style={style} className={className}>
      {children}
    </div>
  )
}

export default function Blog ({
  blog,
  loggedUser,
  handleLikeSubmit,
  deleteBlog,
  editBlog
}) {
  const [isVisible, setIsVisible] = useState(false)

  const styles = {
    border: '1px solid #555',
    borderBottom: '1px solid #555',
    padding: '10px',
    marginBlock: '10px',
    borderRadius: '5px'
  }

  const renderUserOptions = () => {
    return (
      <LoggedUserOptions
        isLogged={loggedUser}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <button type='button' onClick={() => deleteBlog(blog.id)}>
          delete
        </button>
        <EditBlogForm blog={blog} editBlog={editBlog} />
      </LoggedUserOptions>
    )
  }

  return (
    <article style={styles} className='blog'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <strong>
          {blog.title} - {blog.author}
        </strong>

        <button type='button' onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'hide' : 'show'}
        </button>

        {loggedUser?.username === blog.user.username && renderUserOptions()}
      </div>

      {isVisible && (
        <div>
          {blog.url} <br />
          <div>
            {blog.likes}
            <button
              type='submit'
              data-testid='like-button'
              onClick={handleLikeSubmit}
            >
              Like
            </button>
          </div>
        </div>
      )}
    </article>
  )
}
