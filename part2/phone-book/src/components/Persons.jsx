function Person({ person, handleDeletePerson }) {
  return (
    <li key={person.name}>
      {person.name} {person.number}
      <button
        type='button'
        onClick={handleDeletePerson}
        style={{ marginLeft: '5px' }}
      >
        Delete
      </button>
    </li>
  )
}

export default function Persons({ persons, handleDeletePerson }) {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDeletePerson={() => handleDeletePerson(person.id)}
        />
      ))}
    </ul>
  )
}
