import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

function Anecdote ({ anecdote, handleClick }) {
  return (
    <li>
      <p>{anecdote.content}</p>
      <div>
        <span>has {anecdote.votes} </span>
        <button type='button' onClick={handleClick}>
          vote
        </button>
      </div>
    </li>
  )
}

export default function AnecdoteList () {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filterValue = useSelector((state) => state.filter)

  const anecdotesToRender = filterValue
    ? anecdotes
      .filter((anecdote) => anecdote.content.includes(filterValue))
      .sort((a, b) => b.votes - a.votes)
    : [...anecdotes].sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    const anecdoteToUpdate = anecdotes.filter((anecdote) => anecdote.id === id)
    const updatedAnecdote = {
      ...anecdoteToUpdate[0],
      votes: anecdoteToUpdate[0].votes + 1
    }

    dispatch(updateAnecdote(id, updatedAnecdote))
    dispatch(
      setNotification(
        `You voted ${updatedAnecdote.content}, do it more often`,
        3
      )
    )
  }

  return (
    <ul>
      {anecdotesToRender.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      ))}
    </ul>
  )
}
