import styled from 'styled-components'

interface StyledInputProps {
  $isFocused?: boolean
}

export const StyledButton = styled.button<StyledInputProps>`
  flex: 0.5;
  margin-right: 1rem;
  outline: none;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  svg {
    margin-top: 0.2rem;
    font-size: 1.5rem;
    color: ${({ theme, $isFocused }) =>
      $isFocused ? theme.colors.activeInput : theme.colors.placeholder};

    ${({ theme }) => theme.mediaQueries.phone} {
      font-size: 1.3rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.phone} {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    width: 25%;
    margin: 0.3rem;
  }
`