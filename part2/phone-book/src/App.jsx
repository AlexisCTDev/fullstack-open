import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification.jsx'

export default function App() {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
    const newName = event.target.value
    setNewName(newName)
  }

  const handleNumberChange = (event) => {
    const newNumber = event.target.value
    setNewNumber(newNumber)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    const checkPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    )

    if (checkPerson && checkPerson.number === newNumber) {
      alert(`${checkPerson.name} is already added to phonebook`)
      return
    }

    if (checkPerson && checkPerson.number !== newNumber) {
      const confirm = window.confirm(
        `${checkPerson.name} is already added to phonebook, replace the old number with a new one?`
      )

      if (!confirm) return

      personsService
        .update(checkPerson.id, newPersonObject)
        .then(() => personsService.getAll())
        .then((updatedPersons) => {
          setPersons(updatedPersons)
          setNewName('')
          setNewNumber('')
          setNotification({
            message: 'The number has been updated successfully.',
            type: 'successful',
          })
          setTimeout(() => {
            setNotification(null)
          }, 3500)
        })
        .catch((error) => {
          setNotification({
            message: `${error.response.data.error}`,
            type: 'error',
          })
          setTimeout(() => {
            setNotification(null)
          }, 3500)
        })

      return
    }

    personsService
      .create(newPersonObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNotification({
          message: `Added ${newPersonObject.name}`,
          type: 'successful',
        })
        setTimeout(() => {
          setNotification(null)
        }, 3500)
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.error,
          type: 'error',
        })
        setTimeout(() => {
          setNotification(null)
        }, 3500)
      })

    setNewName('')
    setNewNumber('')
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id)
    const confirm = window.confirm(`Delete ${personToDelete.name}?`)

    if (!confirm) return

    personsService
      .remove(id)
      .then(() => personsService.getAll())
      .then((updatedPersons) => {
        setPersons(updatedPersons)
        setNotification({
          message: 'The person has removed successfully.',
          type: 'successful',
        })
        setTimeout(() => {
          setNotification(null)
        }, 3500)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }

  useEffect(() => {
    const newFilteredPersons = !search
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )

    setFilteredPersons(newFilteredPersons)
  }, [search, persons])

  return (
    <>
      <header>
        <h1>Phonebook</h1>
      </header>

      <Notification notification={notification} />
      <Filter value={search} handleFilter={handleSearchChange} />

      <h2>Add a new</h2>
      <PersonForm
        nameValue={newName}
        numberValue={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleAddPerson}
      />

      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </>
  )
}
