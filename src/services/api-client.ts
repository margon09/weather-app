import axios from "axios"

const API_KEY = "3d7e1a3305ed5a13f409b98c4836f7b0"

const weatherApiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: API_KEY,
  },
})

const geoApiClient = axios.create({
  baseURL: "http://api.openweathermap.org/geo/1.0",
  params: {
    appid: API_KEY,
    limit: 1
  },
})

export { weatherApiClient, geoApiClient }