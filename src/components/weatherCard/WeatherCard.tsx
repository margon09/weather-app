import { StyledCard } from "./WeatherCard.styles"

interface Props {
  label: string
  value: string | number | null
  icon?: string
  weatherIcon?: JSX.Element
}

const WeatherCard = ({ label, value, icon, weatherIcon  }: Props) => {
  const cardStyle = {
    backgroundImage: icon ? `url(${icon})` : weatherIcon ? `url(${weatherIcon})` : 'none',
    backgroundSize: '40%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  return (
    <StyledCard style={cardStyle} data-testid='weather-card'>
      {weatherIcon && !icon && <div className="weatherIcon">{weatherIcon}</div>}
      <h3>{label}</h3>
      <p>{value}</p>
    </StyledCard>
  )
}

export default WeatherCard