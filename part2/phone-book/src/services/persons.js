/* eslint-disable no-unused-vars */
import axios from 'axios'

const PERSONS_ENDPOINT_URL = 'http://localhost:3001/persons'

function create(person) {
  return axios
    .post(PERSONS_ENDPOINT_URL, person)
    .then((response) => response.data)
    .catch((error) => {
      console.log('An error has ocurred')
    })
}

function getAll() {
  return axios
    .get(PERSONS_ENDPOINT_URL)
    .then((response) => response.data)
    .catch((error) => {
      console.log('An error has ocurred')
    })
}

function update(id, newData) {
  return axios.put(`${PERSONS_ENDPOINT_URL}/${id}`, newData)
}

function remove(id) {
  return axios.delete(`${PERSONS_ENDPOINT_URL}/${id}`).catch((error) => {
    console.log('An error has ocurred')
  })
}

export default {
  create,
  getAll,
  update,
  remove,
}
