import kelvinToCelsius from './kelvinToCelcius'

describe('kelvinToCelsius', () => {
  test('converts Kelvin to Celsius correctly', () => {
    expect(kelvinToCelsius(273.15)).toBe(0)
    expect(kelvinToCelsius(283.15)).toBe(10)
  })

  test('returns undefined when called without arguments', () => {
    expect(kelvinToCelsius()).toBeUndefined()
  })

  test('rounds the result to the nearest whole number', () => {
    expect(kelvinToCelsius(273.95)).toBe(1)
    expect(kelvinToCelsius(273)).toBe(-0)
  })
})