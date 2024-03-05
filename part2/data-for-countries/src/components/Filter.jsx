export default function Filter({ filterValue, handleFilter }) {
  return (
    <section>
      <form
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <label>
          Find countries
          <input
            type='search'
            onChange={handleFilter}
            value={filterValue}
            style={{ marginLeft: '5px' }}
          />
        </label>
      </form>
    </section>
  )
}
