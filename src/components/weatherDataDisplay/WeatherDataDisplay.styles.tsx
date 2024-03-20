import styled from "styled-components"

export const StyledWeatherContainer = styled.div`
  width: 60%;
  height: auto;
  margin-top: 5rem; 
  padding: 2% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.formBackground};
  border-radius: ${({ theme }) => theme.borderRadius};

  .noDataAvailable{
    color: ${({ theme }) => theme.colors.danger};
  }
  .searchForCityMessage{
    color: ${({ theme }) => theme.colors.black};
  }

  .cityName{
    color: ${({ theme }) => theme.colors.activeInput};
    text-transform: capitalize;
  }

  ${({ theme }) => theme.mediaQueries.phone} {
    width: 100%;
    margin: 0 5%;
    height: auto;
  }
`
export const StyledCardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`