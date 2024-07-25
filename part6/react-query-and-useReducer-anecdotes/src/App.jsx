import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAnecdote, getAllAnecdotes, setVote } from './requests'
import Notification from './components/Notification'
import { useNotificationDispatch } from './hooks/useNotification'

export default function App () {
  const queryClient = useQueryClient()
  const setNotification = useNotificationDispatch()

  const { isLoading, error, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
    retry: 1
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`${newAnecdote.content} anecdote created`)
    },
    onError: (error) => {
      console.error(error.message)
      setNotification(error.message)
    }
  })

  const setVoteMutation = useMutation({
    mutationFn: setVote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map((a) =>
        a.id === anecdote.id ? { ...a, votes: a.votes + 1 } : a
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      setNotification(`${anecdote.content} 'voted`)
    },
    onError: (error) => {
      console.error(error.message)
      setNotification(error.message)
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: anecdote, votes: 0 })
  }

  const incrementVote = (anecdote) => {
    setVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if (isLoading) {
    return (
      <div>
        <h1>Anecdotes</h1>
        <span>Cargando datos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1>Anecdotes</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <main>
      <h1>Anecdote app</h1>
      <Notification />
      <form onSubmit={handleSubmit}>
        <label>
          <h3>Create New:</h3>
          <input type='text' name='anecdote' />
        </label>
        <button type='submit'>create</button>
      </form>
      <ul>
        {data.map((anecdote) => (
          <li key={anecdote.id}>
            <p>{anecdote.content}</p>
            <span>{anecdote.votes}</span>
            <button type='button' onClick={() => incrementVote(anecdote)}>
              vote
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
