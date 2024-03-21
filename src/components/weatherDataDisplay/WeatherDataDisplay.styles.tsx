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
    color: ${({ theme }) => theme.colors.danger};
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

export const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-top: 0.2rem;
    color: ${({ theme }) => theme.colors.activeInput};
    font-size: 4rem;
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`