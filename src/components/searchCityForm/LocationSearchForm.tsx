import { FormEvent, KeyboardEvent, useRef, useState } from 'react'
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
import { RxCross1 } from "react-icons/rx"
import Button from '../ui/Button'

export interface CityFormData {
  city: string
}

interface Props {
  onSubmit: (formData: CityFormData) => void
}

const schema = z.object({
  city: z
    .string()
    .min(3, { message: 'Location name should contain at least 3 letters' }) 
})

const SearchForCityForm = ({ onSubmit }: Props) => {
  const locationRef = useRef<HTMLInputElement>(null)

  const [errors, setErrors] = useState<{ message?: string }>({})
  const [isFocused, setIsFocused] = useState(false)

  const clearInputAndErrors = () => {
    if (locationRef.current) {
      locationRef.current.value = ''
    }
    setErrors({})
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const inputValue = locationRef.current?.value || ''

    const validationResult = schema.safeParse({ city: inputValue })
    if (!validationResult.success) {
      setErrors({ message: validationResult.error.errors[0].message })
      return
    }
    onSubmit(validationResult.data)
    clearInputAndErrors()
  }

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledContainer>
        <StyledLabel htmlFor="city">Search for the city</StyledLabel>
        <StyledInput 
          data-cy='form-input'
          ref={locationRef}
          id='city' 
          type="text" 
          placeholder="e.g. Copenhagen" 
          $hasError={!!errors.message} 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleInputKeyDown}
        />

        <ButtonsContainer>
          <Button 
            type='button' 
            onClick={clearInputAndErrors} 
            isFocused={isFocused}
          >
            <RxCross1 />
          </Button>
          <Button 
            type='submit' 
            isFocused={isFocused}
          >
            <HiMagnifyingGlass />
          </Button>
        </ButtonsContainer>
      </StyledContainer>
      {
        errors &&
        <ErrorText className='danger'>{errors.message}</ErrorText>
      }
    </StyledForm>
  )
}

export default SearchForCityForm