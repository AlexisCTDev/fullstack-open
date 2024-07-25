export function filterReducer (state = '', action) {
  if (action.type === 'SET_FILTER') {
    return action.payload
  }

  return state
}

export function setFilter (value) {
  return {
    type: 'SET_FILTER',
    payload: value
  }
}
