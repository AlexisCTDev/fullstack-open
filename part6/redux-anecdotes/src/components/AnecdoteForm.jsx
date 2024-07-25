import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export default function AnecdoteForm () {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(setNotification('created successfully', 3))
  }

  return (
    <section>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <label>
          content: <input type='text' name='anecdote' />
        </label>
        <button type='submit'>create</button>
      </form>
    </section>
  )
}
