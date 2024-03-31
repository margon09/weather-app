import React from 'react'
import { StyledButton } from './Button.styles'

interface Props {
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  children: React.ReactNode
  isFocused?: boolean
  disabled?: boolean
  largeFont?: boolean
}

const Button = ({ onClick, type = "button", children, isFocused, disabled, largeFont }: Props) => {
  return (
    <StyledButton 
      data-testid='submit-button'
      onClick={onClick} 
      type={type} 
      $isFocused={isFocused} 
      disabled={disabled}
      $largeFont={largeFont}
    >
      {children}
    </StyledButton>
  )
}

export default Button