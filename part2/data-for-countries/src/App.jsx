import { useEffect, useState } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import { getCountriesData } from './services/countries'

export default function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getCountriesData().then((countries) => {
      setCountries(countries)
    })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    if (!search) {
      setError(null)
      setFilteredCountries([])
      return
    }

    const newFilteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    )

    if (newFilteredCountries.length === 0) {
      setFilteredCountries([])
      setError('Country not found.')
      return
    }

    if (newFilteredCountries.length > 10) {
      setFilteredCountries([])
      setError('Too many matches, specify another filter.')
      return
    }

    setFilteredCountries(newFilteredCountries)
    setError(null)
  }, [search, countries])

  return (
    <>
      <Filter handleFilter={handleSearchChange} filterValue={search} />

      <main>
        {error && <p>{error}</p>}
        <Countries countries={filteredCountries} search={search} />
      </main>
    </>
  )
}
