import React from 'react'
import { StyledButton } from './Button.styles';

interface Props {
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  children: React.ReactNode
  isFocused?: boolean
}

const Button = ({ onClick, type = "button", children, isFocused }: Props) => {
  return (
    <StyledButton onClick={onClick} type={type} $isFocused={isFocused}>
      {children}
    </StyledButton>
  )
}

export default Button