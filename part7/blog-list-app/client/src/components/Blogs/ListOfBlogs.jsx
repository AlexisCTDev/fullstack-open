import { Link } from 'react-router-dom'
import { useBlogsValue } from '../../hooks/useBlogs'

export default function ListOfBlogs () {
  const blogs = useBlogsValue()

  if (blogs.length === 0) {
    return <p>No blogs</p>
  }

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
  )
}
