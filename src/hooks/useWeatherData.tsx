import { useEffect, useState } from "react"
import { geoApiClient, weatherApiClient } from "../services/apiClient"
import { HttpStatusCode } from "axios"

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

    const getErrorMessage = (statusCode: string) => {
      const messages: { [key: string]: string } = {
        '400': 'Bad request. Please check your input.',
        '401': 'You are not authorized. Please login and try again.',
        '404': 'The requested city was not found. Please try a different search.',
        '500': 'Server error. Please try again later.'
      }
      return messages[statusCode] || 'An unexpected error occurred. Please try again later.'
    }

    const fetchWeatherData = (q: string) => {
      setError(null)
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
              setError({ message: getErrorMessage(err.response.status) })
              setIsLoading(false)
            }
          })
        } else {
          setError({ message: getErrorMessage(HttpStatusCode.NotFound.toString()) })
          setWeatherData(null)
          setIsLoading(false)
        } 
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError({ message: getErrorMessage(err.response?.status) })
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