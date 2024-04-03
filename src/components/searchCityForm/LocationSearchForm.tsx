import { FormEvent, useRef, useState } from 'react'
import { z } from 'zod'
import { 
  StyledForm, 
  StyledContainer, 
  StyledLabel, 
  StyledInput,
  ButtonsContainer,
  ErrorText
} from './LocationSearchForm.styles'
import { HiMagnifyingGlass } from "react-icons/hi2"
import { FaRegTrashCan } from "react-icons/fa6"
import Button from '../ui/Button'

export interface CityFormData {
  city: string
}

interface Props {
  onSubmit: (formData: CityFormData) => void
}

const schema = z.object({
  city: z.string().min(3, { message: 'Location name should contain at least 3 letters' })
})

const SearchForCityForm = ({ onSubmit }: Props) => {
  const locationRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  const clearInputAndErrors = () => {
    if (locationRef.current) {
      locationRef.current.value = ''
    }
    setError(null)
  }

  const validateInput = (inputValue: string) => {
    const validationResult = schema.safeParse({ city: inputValue })
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message)
      return false
    }
    setError(null)
    return true
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const inputValue = locationRef.current?.value.trim() || ''

    if (validateInput(inputValue)) {
      onSubmit({ city: inputValue })
      clearInputAndErrors()
    }
  }

  const handleInputChange = () => {
    validateInput(locationRef.current?.value || '')
    if (locationRef.current && !/^(?!-)(?!.*-$)[øØæÆåÅa-zA-Z ]+$/.test(locationRef.current.value.substring(locationRef.current.value.length - 1) || '')) { 
      locationRef.current.value = locationRef.current.value.slice(0, -1).trim()
    } 
  }

  const isInputValid = error === null

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledContainer>
        <StyledLabel htmlFor="city">Search for the city</StyledLabel>
        <StyledInput 
          data-cy='form-input'
          data-testid='form-input'
          ref={locationRef}
          id='city' 
          type="text" 
          placeholder="e.g. Copenhagen" 
          $hasError={!isInputValid} 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          onChange={handleInputChange}
        />
        <ButtonsContainer>
          <Button  
            onClick={clearInputAndErrors}>
            <FaRegTrashCan />
          </Button>
          <Button 
            type='submit' 
            isFocused={isFocused}
            disabled={!isInputValid}
            largeFont={true}>
            <HiMagnifyingGlass />
          </Button>
        </ButtonsContainer>
        {error && <ErrorText className='danger'>{error}</ErrorText>}
      </StyledContainer>
    </StyledForm>
  )
}

export default SearchForCityForm
