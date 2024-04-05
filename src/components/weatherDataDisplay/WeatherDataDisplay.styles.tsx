import styled from "styled-components"

interface StyledWeatherProps {
  $error?: boolean
}

export const StyledWeatherContainer = styled.div<StyledWeatherProps>`
  width: 60%;
  height: auto;
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
    text-transform: uppercase;
  }
  
  ${({ theme }) => theme.mediaQueries.phone} {
    width: 100%;
    margin: 0 5%;
    margin-top: 3vh;
    margin-top:${({ $error }) => $error ? '20vh' : '3vg'};
    
    h2{
      margin-top: 40%;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.activeInput};
    }
  }
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    width: 70%;
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

  ${({ theme }) => theme.mediaQueries.phone} {
    margin-top: 40%;
  }
`