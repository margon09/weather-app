import styled from 'styled-components'

interface StyledInputProps {
  $isFocused?: boolean
  $largeFont?: boolean
}

export const StyledButton = styled.button<StyledInputProps>`
  height: 100%;
  flex: 0.5;
  margin-right: 1rem;
  outline: none;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  svg {
    margin-top: 0.1rem;
    color: ${({ theme, $isFocused }) =>
      $isFocused ? theme.colors.activeInput : theme.colors.placeholder};
    font-size: ${({ $largeFont }) => $largeFont ? '2rem' : '1.5rem'};

    ${({ theme }) => theme.mediaQueries.phone} {
      font-size: ${({ $largeFont }) => $largeFont ? '1.5rem' : '1.2rem'};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    ${({ theme }) => theme.mediaQueries.phone} {
      opacity: 0.7;
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