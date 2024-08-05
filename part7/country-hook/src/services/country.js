import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

export async function getCountry (name) {
  const response = await axios.get(`${baseUrl}/name/${name}`)
  const country = response.data
  return {
    name: country.name.common,
    capital: country.capital[0],
    population: country.population,
    flag: country.flags.png
  }
}
