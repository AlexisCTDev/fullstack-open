import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

export function Filter () {
  const dispatch = useDispatch()

  const filterSelected = (value) => {
    dispatch(setFilter(value))
  }

  return (
    <section>
      <h2>search anecdote</h2>
      <form onSubmit={({ target }) => filterSelected(target.filter.value)}>
        <label>
          search:{' '}
          <input
            type='search'
            name='filter'
            onChange={({ target }) => filterSelected(target.value)}
          />
        </label>
        <button type='submit'>search</button>
      </form>
    </section>
  )
}
