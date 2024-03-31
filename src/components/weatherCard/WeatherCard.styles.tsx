import styled from 'styled-components'

export const StyledCard = styled.div`
  width: 25%;
  height: auto;
  min-height: 15rem;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.cardBackground};

  img{
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  h3{
    flex: 0.8;
    font-size: 1.2rem;

    ${({ theme }) => theme.mediaQueries.phone} {
      font-size: 1rem;
    }
  }

  .weatherIcon{
    position: absolute;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.activeInput};
    z-index: 1;
  }

  p{
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.2;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.white};

    background: ${({ theme }) => theme.colors.activeInput};
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  ${({ theme }) => theme.mediaQueries.phone} {
    width: 70%;
    height: auto;
    font-size: 1rem;
  }
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    min-width: 32%;
    min-height: 10rem;
  }
  ${({ theme }) => theme.mediaQueries.tablet} {
    min-width: 35%;
    min-height: 12rem;
  }
  ${({ theme }) => theme.mediaQueries.laptop} {
    min-width: 35%;
    min-height: 12rem;
  }
`