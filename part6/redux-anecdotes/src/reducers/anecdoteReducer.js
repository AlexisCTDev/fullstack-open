import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../service/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote (state, action) {
      return state.concat(action.payload)
    },
    incrementVote (state, action) {
      const id = action.payload
      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { incrementVote, setAnecdotes, appendAnecdote } =
anecdoteSlice.actions

const anecdoteReducer = anecdoteSlice.reducer
export default anecdoteReducer

export function initializeAnecdotes () {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export function createAnecdote (content) {
  return async (dispatch) => {
    const returnedAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(returnedAnecdote))
  }
}

export function updateAnecdote (id, anecdote) {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, anecdote)
    dispatch(incrementVote(updatedAnecdote.id))
  }
}
