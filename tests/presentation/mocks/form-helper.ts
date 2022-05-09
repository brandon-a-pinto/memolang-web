import faker from '@faker-js/faker'
import { screen, fireEvent } from '@testing-library/react'

export const testStatusForField = (
  fieldName: string,
  validationError: string = ''
): void => {
  const status = screen.getByTestId(`${fieldName}-status`)
  expect(status.textContent).toBe(validationError)
}

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
