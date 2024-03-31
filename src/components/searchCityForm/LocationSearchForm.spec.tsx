import { ReactNode } from 'react'
import { theme } from 'src/global/Theme'
import { ThemeProvider } from 'styled-components'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import SearchForCityForm from './LocationSearchForm'

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('SearchForCityForm', () => {
  let onSubmit: jest.Mock

  beforeEach(() => {
    onSubmit = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    renderWithTheme(<SearchForCityForm onSubmit={onSubmit} />)

    expect(screen.getByTestId('form-input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g. Copenhagen')).toBeInTheDocument()
  })

  it('submits valid form data', async () => {
    renderWithTheme(<SearchForCityForm onSubmit={onSubmit} />)
    const input = screen.getByTestId('form-input') as HTMLInputElement
    const buttons = screen.getAllByTestId('submit-button')

    fireEvent.change(input, { target: { value: 'London' } })

    const buttonToClick = buttons[1]

    fireEvent.change(input, { target: { value: 'London' } })
    fireEvent.click(buttonToClick)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ city: 'London' })
    })
  })

  it('clears the input when the clear button is clicked', () => {
    renderWithTheme(<SearchForCityForm onSubmit={onSubmit} />)
    const input = screen.getByTestId('form-input') as HTMLInputElement

    const buttons = screen.getAllByTestId('submit-button')
    const buttonToClick = buttons[0]

    fireEvent.change(input, { target: { value: 'London' } })
    fireEvent.click(buttonToClick)

    expect(input.value).toBe('')
  })

  it('displays error message for invalid input', async () => {
    renderWithTheme(<SearchForCityForm onSubmit={onSubmit} />)
    const input = screen.getByTestId('form-input') as HTMLInputElement

    const buttons = screen.getAllByTestId('submit-button')
    const buttonToClick = buttons[1]

    fireEvent.change(input, { target: { value: 'Lo' } })
    fireEvent.click(buttonToClick)

    await waitFor(() => {
      expect(screen.getByText('Location name should contain at least 3 letters')).toBeInTheDocument()
    })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('disables submit button when input is invalid', () => {
    renderWithTheme(<SearchForCityForm onSubmit={onSubmit} />)
    const input = screen.getByTestId('form-input') as HTMLInputElement

    const buttons = screen.getAllByTestId('submit-button')
    const buttonToClick = buttons[1]

    fireEvent.change(input, { target: { value: 'Lo' } })
    fireEvent.click(buttonToClick)

    expect(buttonToClick).toBeDisabled()
  })
  it('enables submit button when input is invalid', () => {
    renderWithTheme(<SearchForCityForm onSubmit={onSubmit} />)
    const input = screen.getByTestId('form-input') as HTMLInputElement

    const buttons = screen.getAllByTestId('submit-button')
    const buttonToClick = buttons[1]

    fireEvent.change(input, { target: { value: 'London' } })
    fireEvent.click(buttonToClick)

    expect(buttonToClick).toBeEnabled()
  })

  it('updates input value and triggers validation', () => {
    renderWithTheme(<SearchForCityForm onSubmit={onSubmit} />)
    const input = screen.getByTestId('form-input') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'London' } })

    expect(input.value).toBe('London')
    expect(screen.queryByText('Location name should contain at least 3 letters')).not.toBeInTheDocument()
  })
})
