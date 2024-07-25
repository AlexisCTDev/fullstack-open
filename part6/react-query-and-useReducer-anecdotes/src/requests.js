const baseURL = 'http://localhost:3001/anecdotes'

export async function getAllAnecdotes () {
  try {
    const response = await fetch(baseURL)

    if (response.ok) {
      return await response.json()
    } else {
      const errorDetail = {
        statusCode: response.status,
        statusText: response.statusText,
        message: `Error: ${response.status}, ${response.statusText}`
      }

      throw errorDetail
    }
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      const networkErrorDetail = {
        statusCode: 0,
        statusText: 'Network Error',
        message: 'anecdote service not avaliable due to problems in server.'
      }
      throw networkErrorDetail
    } else {
      throw error
    }
  }
}

export async function createAnecdote (newAnecdote) {
  const validateContent = newAnecdote.content.replaceAll(' ', '').length >= 5

  if (!validateContent) {
    throw new Error(
      'Error: Minimum content length must be 5 characters.'
    )
  }

  const response = await fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(newAnecdote),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}, ${response.statusText}`)
  }

  return await response.json()
}

export async function setVote (anecdote) {
  const response = await fetch(`${baseURL}/${anecdote.id}`, {
    method: 'PUT',
    body: JSON.stringify(anecdote),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return await response.json()
}
