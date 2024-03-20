function kelvinToCelsius(kelvin?: number): number | undefined{
  if (kelvin === undefined) 
    return kelvin
  return Number((kelvin - 273.15).toFixed(0))
}

export default kelvinToCelsius