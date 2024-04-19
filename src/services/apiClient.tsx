import axios from "axios"

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const weatherApiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: API_KEY,
  },
})

const geoApiClient = axios.create({
  baseURL: "https://api.openweathermap.org/geo/1.0",
  params: {
    appid: API_KEY,
    limit: 1
  },
})

export { weatherApiClient, geoApiClient }