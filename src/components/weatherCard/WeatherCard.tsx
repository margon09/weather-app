import { StyledCard } from "./WeatherCard.styles"

interface Props {
  label: string
  value: string | number | null
  icon?: string
}

const WeatherCard = ({ label, value, icon }: Props) => {
  const cardStyle = {
    backgroundImage: icon ? `url(${icon})` : 'none',
    backgroundSize: '40%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  return (
    <StyledCard style={cardStyle}>
      <h3>{label}</h3>
      <p>{value}</p>
    </StyledCard>
  )
}

export default WeatherCard