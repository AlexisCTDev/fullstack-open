const BASE_URL = 'http://localhost:3001/anecdotes'

async function getAll () {
  const response = await fetch(BASE_URL)
  return await response.json()
}

async function create (content) {
  const anecdote = { content, votes: 0 }
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(anecdote),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return await response.json()
}

async function update (id, anecdote) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(anecdote),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return await response.json()
}

const anecdoteService = { getAll, create, update }

export default anecdoteService
