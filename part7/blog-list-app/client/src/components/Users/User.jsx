import { Link, useMatch } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'
import { useBlogsValue } from '../../hooks/useBlogs'

export default function User () {
  const { users } = useUsers()
  const blogs = useBlogsValue()
  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null
  const userBlogs = user ? blogs.filter((blog) => blog.user.id === user.id) : []

  if (!user) {
    return (
      <div>
        <p>User not found</p>
      </div>
    )
  }

  return (
    <section>
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      {userBlogs.length === 0 && <p>No blogs added</p>}
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
