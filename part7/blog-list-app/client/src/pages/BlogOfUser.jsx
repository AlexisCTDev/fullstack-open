import { useMatch } from 'react-router-dom'
import { useBlogsValue } from '../hooks/useBlogs'
import Blog from '../components/Blogs/Blog'
import ListOfComments from '../components/Comments/ListOfComments'
import CommentForm from '../components/Comments/CommentForm'

export default function BlogOfUser () {
  const blogs = useBlogsValue()
  const match = useMatch('/blogs/:id')
  const userBlog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null

  if (!userBlog) return

  return (
    <section>
      <Blog blog={userBlog} />
      <h3>Comments</h3>
      <CommentForm blogId={userBlog.id} />
      <ListOfComments blogId={userBlog.id} />
    </section>
  )
}
