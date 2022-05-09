import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  RenderResult,
  waitFor
} from '@testing-library/react'
import faker from '@faker-js/faker'

import { Login } from '@/presentation/pages'
import { ValidationStub, Helper } from '@/tests/presentation/mocks'
import { AuthenticationSpy } from '@/tests/domain/mocks'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

const makeSut = (validationError?: string): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  )
  return { sut, validationStub, authenticationSpy }
}

const simulateValidSubmit = async (
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut(validationError)
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut(validationError)
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut(validationError)
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  it('should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  it('should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('email')
    Helper.populateField('password')
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  it('should show spinner on submit', () => {
    makeSut()
    simulateValidSubmit()
    expect(screen.getByTestId('spinner')).toBeTruthy()
  })

  it('should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call Authentication only once', () => {
    const { authenticationSpy } = makeSut()
    simulateValidSubmit()
    simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut(validationError)
    simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => {
      throw error
    })
    await simulateValidSubmit()
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
    expect(screen.getByTestId('main-error').textContent).toBe(
      `* ${error.message}`
    )
  })
})
