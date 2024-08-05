import axios from 'axios'

const baseUrl = '/api/users'

async function getAll () {
  const response = await axios.get(baseUrl)
  return response.data
}

async function getById (id) {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

async function create (user) {
  const response = await axios.post(baseUrl, user)
  return response.data
}

const userService = { getAll, getById, create }
export default userService
