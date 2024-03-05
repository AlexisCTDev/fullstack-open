import { useEffect, useState } from 'react'
import { getWeatherData } from '../services/weather'

export default function Weather({ country }) {
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    getWeatherData(country.capitalLatitude, country.capitalLongitude).then(
      (weatherData) => {
        setWeatherData(weatherData)
      }
    )
  }, [country.capitalLatitude, country.capitalLongitude])

  return (
    <section>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {weatherData.temperature} °C</p>
      <img
        src={weatherData.icon}
        alt={`${weatherData.weatherDescription} icon`}
        width={100}
        height={100}
      />
      <p>Wind {weatherData.wind} m/s</p>
    </section>
  )
}
