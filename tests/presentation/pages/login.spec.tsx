import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@testing-library/react'
import faker from '@faker-js/faker'

import { Login } from '@/presentation/pages'
import { ValidationSpy } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationSpy} />)
  return { sut, validationSpy }
}

describe('Login Component', () => {
  afterEach(cleanup)

  it('should start with initial state', async () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.input).toEqual({
      email
    })
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.input).toEqual({
      password
    })
  })

  it('should show email error if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe(validationSpy.errorMessage)
  })
})
