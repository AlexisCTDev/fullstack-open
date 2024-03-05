import { useState } from 'react'
import Weather from './Weather'

function CountryWithData({ country }) {
  return (
    <article>
      <section>
        <h2>{country.name}</h2>
        <div>
          <p>
            Capital: {country.capital}
          </p>
          <p>
            Area: {country.area}
          </p>
        </div>

        <h3>Languages:</h3>
        <div>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>

        <br />
        <img src={country.flagPng} alt={country.altFalgImg} />
      </section>
      
      <Weather country={country} />
    </article>
  )
}

function Country({ country }) {
  const [show, SetShow] = useState(false)

  const handleClick = () => {
    SetShow(!show)
  }

  return (
    <li key={country.name}>
      <span>{country.name}</span>
      <button style={{ marginLeft: '5px' }} type='button' onClick={handleClick}>
        {show ? 'hide' : 'show'}
      </button>
      {show && <CountryWithData country={country} />}
    </li>
  )
}

function AllCountries({ countries }) {
  return (
    <ul>
      {countries.map((country) => (
        <Country key={country.name} country={country} />
      ))}
    </ul>
  )
}

export default function Countries({ countries, search }) {
  if (!search) return

  if (countries.length === 1) {
    return <CountryWithData country={countries[0]} />
  }

  return <AllCountries countries={countries} />
}
