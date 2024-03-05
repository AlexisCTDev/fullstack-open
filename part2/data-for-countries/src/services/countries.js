import axios from 'axios'

const COUNTRIES_DATA_ENDPOINT_URL =
  'https://studies.cs.helsinki.fi/restcountries/api/all'

export function getCountriesData() {
  return axios
    .get(`${COUNTRIES_DATA_ENDPOINT_URL}`)
    .then((response) => {
      const countries = response.data

      return countries.map((countrie) => ({
        name: countrie.name.common,
        capital: countrie.capital,
        area: countrie.area,
        languages: countrie.languages,
        flagPng: countrie.flags.png,
        flagSvg: countrie.flags.svg,
        altFalgImg: countrie.flags.alt,
        capitalLatitude: countrie.capitalInfo.latlng?.[0],
        capitalLongitude: countrie.capitalInfo.latlng?.[1],
      }))
    })
    .catch((error) => {
      console.error('An error has ocurred:', error)
    })
}
