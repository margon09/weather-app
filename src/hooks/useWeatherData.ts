import { useEffect, useState } from "react"
import { geoApiClient, weatherApiClient } from "../services/api-client"

interface WeatherData {
  weather: {description: string,icon: string}[]
  main: {temp: number, feels_like: number, humidity: number}
  wind: {speed: number}
  clouds: {all: number}
}

interface WeatherError {
  message: string
}

const useWeatherData = (city?: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [error, setError] = useState<WeatherError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {

    const controller = new AbortController()

    const fetchWeatherData = (q: string) => {
      setIsLoading(true)
      geoApiClient
        .get("/direct", {
          signal: controller.signal,
          params: {q}
      }).then(res => {
      if(res.data.length){
        weatherApiClient
          .get("/weather", {
          signal: controller.signal,
          params: { lat: res?.data[0].lat, lon: res?.data[0].lon},
        })
          .then(response => {
            setWeatherData(response.data)
            setError(null)
            setIsLoading(false)
          })
          .catch(err => {
            if (err.name !== 'AbortError') {
              setError({ message: err.message })
              setIsLoading(false)
            }
          })
        } else {
          setWeatherData(null)
          setIsLoading(false)
        } 
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError({ message: err.message })
          setIsLoading(false)
        }
      })
    }

    if(city){
      fetchWeatherData(city)
    }

    return () => {
      controller.abort()
    }
  }, [city])

  return { weatherData, error, isLoading }
}

export default useWeatherData