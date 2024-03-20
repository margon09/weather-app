import { useState } from "react"
import SearchForCityForm, { CityFormData } from "./components/searchCityForm/LocationSearchForm"
import WeatherDataDisplay from "./components/weatherDataDisplay/WeatherDataDisplay"
import { StyledContainer } from "./App.styles"

function App() {
  const [cityData, setCityData] = useState<CityFormData | null>(null)

  
  const handleSubmit = (formData: CityFormData) => {
    setCityData(formData)
  }
  return (
    <StyledContainer>
      <SearchForCityForm onSubmit= {handleSubmit}/>
      <WeatherDataDisplay data={cityData}/>
    </StyledContainer>
  )
}

export default App
