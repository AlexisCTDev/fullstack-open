import axios from 'axios'

const BASE_URL = '/api/blogs'

let token = null

function setToken (newToken) {
  token = `Bearer ${newToken}`
}

async function getAll () {
  const response = await axios.get(BASE_URL)
  return response.data
}

async function getById (id) {
  const response = await axios.get(`${BASE_URL}/${id}`)
  return response.data
}

async function create (blog) {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(BASE_URL, blog, config)
  return response.data
}

async function update (id, newBlog) {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(`${BASE_URL}/${id}`, newBlog, config)
  return response.data
}

async function deleteOne (id) {
  const config = {
    headers: {
      Authorization: token
    }
  }

  await axios.delete(`${BASE_URL}/${id}`, config)
}

const blogService = { getAll, getById, create, setToken, update, deleteOne }
export default blogService
