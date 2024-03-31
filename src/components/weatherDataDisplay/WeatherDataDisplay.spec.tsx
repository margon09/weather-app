import { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from 'src/global/Theme'
import WeatherDataDisplay from './WeatherDataDisplay'
import useWindowSize from '../../hooks/useWindowSize'
import useWeatherData from '../../hooks/useWeatherData'

jest.mock('../../hooks/useWindowSize')
jest.mock('../../hooks/useWeatherData')

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

const testData = { city: 'London' }

describe('WeatherDataDisplay', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    jest.mocked(useWindowSize).mockImplementation(() => ({
      width: 1280,
      height: 720,
    }))

    const weatherMock = require('../../data/weatherMock.json')
    jest.mocked(useWeatherData).mockImplementation(() => ({
      weatherData: weatherMock,
      error: null,
      isLoading: false,
    }))

  })

  it('renders current weather data correctly', () => {
    renderWithTheme(<WeatherDataDisplay data={testData} />)
    
    expect(screen.getByText('Current weather in')).toBeInTheDocument()
    expect(screen.getByText('London')).toBeInTheDocument()
    expect(screen.getByText('Moderate rain')).toBeInTheDocument()
    expect(screen.getByText('Temperature')).toBeInTheDocument()

    const tempInCelsius = Math.round(298.48 - 273.15)
    expect(screen.getByText(`${tempInCelsius}°C`)).toBeInTheDocument()
  })

  it('displays a loading spinner when data is being fetched', () => {
    jest.mocked(useWeatherData).mockImplementation(() => ({
      weatherData: null,
      error: null,
      isLoading: true,
    }))

    renderWithTheme(<WeatherDataDisplay data={testData} />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('displays an error message when there is an error fetching weather data', () => {
    jest.mocked(useWeatherData).mockImplementation(() => ({
      weatherData: null,
      error: { message: 'Failed to fetch weather data' },
      isLoading: false,
    }))

    renderWithTheme(<WeatherDataDisplay data={testData} />)

    const errorMessage = screen.getByTestId('error-message')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveTextContent('Failed to fetch weather data')
  })

  it('displays a "No city data available" message when no data prop is provided', () => {
    jest.mocked(useWeatherData).mockImplementation(() => ({
      weatherData: null,
      error: null,
      isLoading: false,
    }))

    renderWithTheme(<WeatherDataDisplay data={null} />)

    const noDataMessage = screen.getByText('No city data available')
    expect(noDataMessage).toBeInTheDocument()
  })

  it('displays a detailed header on desktop screens', () => {
    jest.mocked(useWindowSize).mockImplementation(() => ({
      width: 1024,
      height: 768,
    }))

    renderWithTheme(<WeatherDataDisplay data={testData} />)

    expect(screen.getByText('Current weather in')).toBeInTheDocument()

    expect(screen.getByText(testData.city)).toBeInTheDocument()

    const header = screen.getByTestId('current-weather-header')
    expect(header).toContainHTML('Current weather in <span class="cityName">London</span>')
  })

  it('displays a simplified header on mobile screens', () => {
    jest.mocked(useWindowSize).mockImplementation(() => ({
      width: 375,
      height: 667,
    }))

    renderWithTheme(<WeatherDataDisplay data={testData} />)

    expect(screen.getByText(testData.city)).toBeInTheDocument()
    expect(screen.queryByTestId('current-weather-header')).not.toBeInTheDocument()
  })
})


