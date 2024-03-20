import styled from "styled-components"

interface StyledInputProps {
  $hasError?: boolean;
  $isFocused?: boolean;
}

export const StyledForm = styled.form`
  width: 60%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.formBackground};

  ${({ theme }) => theme.mediaQueries.phone} {
    width: 100%;
    margin: 0 5%;
  }
`
export const StyledContainer = styled.div`
  position: relative; 
  width: 80%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`
export const StyledLabel = styled.label`
  width: calc(100% - 2rem);
  margin-bottom: 0.5rem;
  font-family: Helvetica, sans-serif;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.activeInput};
  
  ${({ theme }) => theme.mediaQueries.phone} {
    width: calc(100% - 0rem);
    font-size: 1rem;
  }
`

export const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;
  width: calc(100% - 2rem);
  height: 4vh;
  padding: 0.5rem;
  font-size: 1.2rem;
  border: 1px solid ${({ theme, $hasError }) => $hasError ? theme.colors.danger : theme.colors.borders};
  border-radius: ${({ theme }) => theme.borderRadius};

  &:focus {
    font-size: 1.2rem;
    border-color: ${({ theme }) => theme.colors.activeInput};
    outline: none;
    
    ${({ theme }) => theme.mediaQueries.phone} {
      font-size: 1rem;
    }
  }

  &::placeholder{
    color: ${({ theme }) => theme.colors.placeholder};
    width: 85%;
  }

  &:focus::placeholder {
    color: transparent;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0px 100px ${({ theme }) => theme.colors.white} inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  ${({ theme }) => theme.mediaQueries.phone} {
    width: calc(100% - 0rem);
  }
`
export const ButtonsContainer = styled.div`
  width: 15%;
  height:  2.2rem !important;
  position: absolute;
  top: 72%;
  right: 2rem;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.phone} {
    width: 30%;
    right: 0.3rem;
  }
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    width: 25%;
  }
  ${({ theme }) => theme.mediaQueries.tablet} {
    width: 25%;
  }
`
export const SearchButton = styled.button<StyledInputProps>`
  flex: 0.5;
  margin-right: 1rem;
  outline: none;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  svg {
    margin-top: 0.2rem;
    color: ${({ theme }) => theme.colors.placeholder};
    font-size: 1.5rem;

    color: ${({ theme, $isFocused }) =>
        $isFocused
          ? theme.colors.activeInput
          : theme.colors.placeholder};

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

export const DeleteButton = styled(SearchButton)`
  svg {
    font-size: 1.4rem;

      color: ${({ theme, $isFocused }) =>
        $isFocused
          ? theme.colors.danger
          : theme.colors.placeholder};
      
    ${({ theme }) => theme.mediaQueries.phone} {
      font-size: 1.3rem;
    }
  }
`

export const ErrorText = styled.p`
  padding-top: 1rem;
  position: absolute;
  transform: translateY(150%);
  color: ${({ theme }) => theme.colors.danger};
`