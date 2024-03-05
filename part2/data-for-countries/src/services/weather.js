import axios from 'axios'

const WEATHER_DATA_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const API_KEY = 'Your api key'

export function getWeatherData(latitude, longitude) {
  return axios
    .get(`${WEATHER_DATA_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then((res) => {
      const weatherData = res.data

      return {
        temperature: Math.round(weatherData.main.temp - 273.15),
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
        wind: weatherData.wind.speed,
        weatherDescription: weatherData.weather[0].description,
      }
    })
    .catch((error) => {
      console.error('An error has ocurred:', error)
    })
}
