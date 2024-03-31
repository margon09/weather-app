import { useEffect, useState } from "react"
import { geoApiClient, weatherApiClient } from "../services/apiClient"

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
              let userMessage = ''
              if (err.response && err.response.status === 404) {
                userMessage = 'City not found. Please try a different search.'
              } else {
                userMessage = 'An unexpected error occurred. Please try again later.'
              }
              setError({ message: userMessage })
              setIsLoading(false)
            }
          })
        } else {
          setError({ message: 'City not found. Please try a different search.' })
          setWeatherData(null)
          setIsLoading(false)
        } 
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          if (!err.response) {
            setError({ message: 'Network error. Please check your internet connection and try again.' })
          } else {
            const status = err.response.status;
            let errorMessage = 'An error occurred. Please try again later.'
            
            if (status === 400) {
              errorMessage = 'Bad request. Please check your input.'
            } else if (status === 401) {
              errorMessage = 'You are not authorized. Please login and try again.'
            } else if (status === 404) {
              errorMessage = 'The requested resource was not found.'
            } else if (status === 500) {
              errorMessage = 'Server error. Please try again later.'
            }
            
            setError({ message: errorMessage })
          }
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