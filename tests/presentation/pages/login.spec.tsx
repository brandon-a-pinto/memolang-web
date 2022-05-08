import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@testing-library/react'
import faker from '@faker-js/faker'

import { Login } from '@/presentation/pages'
import { ValidationStub } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (validationError?: string): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError
  const sut = render(<Login validation={validationStub} />)
  return { sut, validationStub }
}

describe('Login Component', () => {
  afterEach(cleanup)

  it('should start with initial state', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut(validationError)
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  it('should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut(validationError)
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe(validationError)
  })

  it('should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut(validationError)
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.textContent).toBe(validationError)
  })

  it('should show valid email state if Validation succeeds', async () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe('')
  })

  it('should show valid password state if Validation succeeds', async () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.textContent).toBe('')
  })

  it('should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
})
