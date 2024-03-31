import { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from 'src/global/Theme'
import WeatherCard from './WeatherCard'

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

const PROPS = {
    label: 'Today',
    value: 'Rainy',
    icon: 'https://openweathermap.org/img/wn/10d@2x.png'
  }

describe('WeatherCard', () => {
    it('renders correct weather icon', () => {
    renderWithTheme(<WeatherCard {...PROPS} />)

    const weatherCardElement = screen.getByTestId('weather-card')
    expect(weatherCardElement).toBeInTheDocument()
    expect(weatherCardElement).toHaveStyle(`background-image: url(${PROPS.icon})`)
  })

  it('renders label correctly', () => {
    renderWithTheme(<WeatherCard {...PROPS} />)

    const labelElement = screen.getByText(PROPS.label)
    expect(labelElement).toBeInTheDocument()
  })

  it('renders value correctly', () => {
    renderWithTheme(<WeatherCard {...PROPS} />)

    const valueElement = screen.getByText(PROPS.value)
    expect(valueElement).toBeInTheDocument()
  })
})