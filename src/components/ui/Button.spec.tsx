import { ReactNode } from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Button from './Button'
import { theme } from 'src/global/Theme'
import { ThemeProvider } from 'styled-components'

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Button', () => {
  it('renders correctly with children', () => {
    renderWithTheme(<Button>Hello</Button>)
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Hello')
  })

  it('calls onClick handler when clicked', () => {
    const onClick = jest.fn()
    renderWithTheme(<Button onClick={onClick}>Click me</Button>)
    fireEvent.click(screen.getByTestId('submit-button'))
    expect(onClick).toHaveBeenCalled()
  })

  it('sets correct button type', () => {
    renderWithTheme(<Button type="submit">Submit</Button>)
    expect(screen.getByTestId('submit-button')).toHaveAttribute('type', 'submit')
  })

  it('disables the button when disabled is true', () => {
    renderWithTheme(<Button disabled>Disabled</Button>)
    expect(screen.getByTestId('submit-button')).toBeDisabled()
  })
})
