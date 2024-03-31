import { StyledWeatherContainer, StyledCardsContainer, SpinnerContainer } from './WeatherDataDisplay.styles'
import { CityFormData } from "../searchCityForm/LocationSearchForm"
import WeatherCard from '../weatherCard/WeatherCard'
import kelvinToCelsius from '../../utils/kelvinToCelcius'
import useWindowSize from '../../hooks/useWindowSize'
import useWeatherData from "../../hooks/useWeatherData"
import { ImSpinner } from "react-icons/im"
import { WiHumidity } from "react-icons/wi"
import { LiaTemperatureHighSolid, LiaTemperatureLowSolid } from "react-icons/lia"
import { FiWind } from "react-icons/fi"
import { BsClouds } from "react-icons/bs"

interface Props {
  data: CityFormData | null 
}

const WeatherDataDisplay = ({ data }: Props) => {
  const {width} = useWindowSize()
  const isDesktop = width > 599

  const { weatherData, error, isLoading} = useWeatherData(data?.city)

  const weatherIcon = `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`


  const weatherDetails = [
    { label: 'Today', value: weatherData && (weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData?.weather[0]?.description.slice(1)), icon: weatherIcon },
    { label: 'Temperature', value: `${kelvinToCelsius(weatherData?.main.temp)}°C` },
    { label: 'Wind Speed', value: `${weatherData?.wind.speed} m/s` },
    { label: 'Cloudiness', value: `${weatherData?.clouds.all}%` },
    { label: 'Feels Like', value: `${kelvinToCelsius(weatherData?.main.feels_like)}°C` },
    { label: 'Humidity', value: `${weatherData?.main.humidity}%` }
  ]

  const iconMapping: { [key: string]: JSX.Element } = {
  "Humidity": <WiHumidity />,
  "Temperature": <LiaTemperatureHighSolid />,
  "Feels Like": <LiaTemperatureLowSolid />,
  "Wind Speed": <FiWind />,
  "Cloudiness": <BsClouds />
}

  if(isLoading){
    return <SpinnerContainer data-cy='loading-spinner' data-testid='loading-spinner'>
      <ImSpinner />
    </SpinnerContainer>
  }

  if (error) {
    return <StyledWeatherContainer $error={!!error}>
      <h3 
        data-cy='error-message' 
        data-testid='error-message' 
        className='searchForCityMessage'
      >
        {error?.message}
      </h3>
    </StyledWeatherContainer>
  }

  if (!data || !weatherData) {
    return <StyledWeatherContainer>
      <h2 className='noDataAvailable'>No city data available</h2>
    </StyledWeatherContainer>
  }

  return (
    <StyledWeatherContainer>
      {
        isDesktop 
        ? <h2 
          data-cy='current-weather-header' 
          data-testid='current-weather-header'
          >
            Current weather in <span className='cityName'>{data.city}</span>
          </h2> 
        : <h2>{data.city}</h2>
      }

      <StyledCardsContainer>
        {weatherDetails.map((detail, index) => (
          <WeatherCard 
            key={index} 
            label={detail.label} 
            value={detail.value} 
            icon={index === 0 ? detail.icon : undefined}
            weatherIcon={index !== 0 ? iconMapping[detail.label] : undefined}
          />
        ))}
      </StyledCardsContainer>
    </StyledWeatherContainer>
  )
}

export default WeatherDataDisplay