import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

async function getAll () {
  const response = await axios.get('/api/comments')
  return response.data
}

async function getCommentsOfBlog (blogId) {
  const response = await axios.get(`/api/blogs/${blogId}/comments`)
  return response.data
}

async function create (newComment, blogId) {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(
    `/api/blogs/${blogId}/comments`,
    newComment,
    config
  )
  return response.data
}

const commentService = { getAll, getCommentsOfBlog, create, setToken }
export default commentService
