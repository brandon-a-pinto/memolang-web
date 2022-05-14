import faker from '@faker-js/faker'
import { screen, cleanup } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { SignUp } from '@/presentation/pages'
import {
  renderWithHistory,
  Helper,
  ValidationStub
} from '@/tests/presentation/mocks'

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (validationError?: string): void => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError
  renderWithHistory({
    history,
    Page: () => SignUp({ validation: validationStub })
  })
}

const simulateValidSubmit = async () => {
  Helper.populateField('email')
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut(validationError)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('username', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut(validationError)
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  it('should show username error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut(validationError)
    Helper.populateField('username')
    Helper.testStatusForField('username', validationError)
  })

  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut(validationError)
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  it('should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut(validationError)
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('should show valid username state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('username')
    Helper.testStatusForField('username')
  })

  it('should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  it('should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  it('should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('email')
    Helper.populateField('username')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })
})
