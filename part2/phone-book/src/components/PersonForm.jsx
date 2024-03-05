export default function PersonForm({
  nameValue,
  numberValue,
  handleSubmit,
  handleNameChange,
  handleNumberChange,
}) {
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          name:
          <input
            type='text'
            value={nameValue}
            onChange={handleNameChange}
            required
          />
        </label>
        <br />
        <label>
          Number:
          <input
            type='tel'
            value={numberValue}
            onChange={handleNumberChange}
            required
          />
        </label>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </section>
  )
}
