import deepFreeze from 'deep-freeze'
import { test, expect, describe } from 'vitest'
import anecdoteReducer from './anecdoteReducer'

describe('anecdoteReducer', () => {
  test('create one anecdote', () => {
    const state = []

    deepFreeze(state)

    const action = {
      type: 'anecdote/appendAnecdote',
      payload: {
        content: 'If it hurts, do it more often',
        votes: 0,
        id: 0
      }
    }

    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(
      action.payload
    )
  })

  test('increment votes', () => {
    const state = [
      { id: 1, content: 'If it hurts, do it more often', votes: 0 }
    ]

    deepFreeze(state)

    const action = {
      type: 'anecdote/incrementVote',
      payload: 1
    }

    const newState = anecdoteReducer(state, action)

    deepFreeze(newState)

    const stateToTest = anecdoteReducer(newState, action)

    expect(stateToTest).toHaveLength(1)
    expect(stateToTest).toContainEqual({
      id: 1,
      content: 'If it hurts, do it more often',
      votes: 2
    })
  })
})
