export default function Filter({ value, handleFilter }) {
  return (
    <section>
      <form>
        <label>
          Filter shown with:
          <input type='search' value={value} onChange={handleFilter} />
        </label>
      </form>
    </section>
  )
}
