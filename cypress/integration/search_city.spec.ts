describe('City search', () => {
  beforeEach(() => {
    cy.visit('/')


    // Geocoding API response mock (Madrid)
    cy.intercept('GET', 'http://api.openweathermap.org/geo/1.0/direct', (req) => {
      if (req.query.q === 'InvalidCity') {
        req.reply({
          statusCode: 200,
          body: []
        })
      } else {
        req.reply({
          statusCode: 200,
          body: [{ lat: 40.4168, lon: -3.7038 }]
        })
      }
    }).as('getGeocode')

    //  Weather API response mock (Madrid)
    cy.intercept('GET', 'http://api.openweathermap.org/data/2.5/weather', (req) => {
      if (req.query.lat === 40.4168 && req.query.lon === -3.7038) {
        req.reply({
          statusCode: 200,
          body: {
            weather: [{ description: "clear sky", icon: "01d" }],
            main: { temp: 299.82, feels_like: 299.82, humidity: 30 },
            wind: { speed: 4.1 },
            clouds: { all: 0 }
          }
        });
      } else {
        req.reply({
          statusCode: 404,
          body: { message: 'weather data not found' }
        })
      }
    }).as('getWeather')
  })

  it('should not display city data by default', () => {
    cy.contains('No city data available').should('be.visible')
  })

  it('should display validation error message if user types less than 3 characters', () => {
    cy.get('[data-cy="form-input"]').type('Ma')
    cy.get('button[type="submit"]').click({force:true})
    cy.contains('Location name should contain at least 3 letters').should('be.visible')
  })

  it('should show a loading spinner after the form is submitted', () => {
    cy.get('[data-cy="form-input"]').type('Madrid')
    cy.get('button[type="submit"]').click()
    cy.get('[data-cy="loading-spinner"]').should('be.visible')
  })

  it('should display an error message for a non-existent city', () => {
    cy.get('[data-cy="form-input"]').type('InvalidCity')
    cy.get('button[type="submit"]').click()
    cy.get('[data-cy="error-message"]').should('contain', 'City not found')
  })

  it('should get weather data for Paris', () => {
    cy.get('[data-cy="form-input"]').type('Paris')
    cy.get('button[type="submit"]').click()
    cy.get('[data-cy="current-weather-header"]').should('contain', 'Current weather in Paris')
  })

})