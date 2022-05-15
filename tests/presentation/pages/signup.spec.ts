import faker from '@faker-js/faker'
import { screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { SignUp } from '@/presentation/pages'
import {
  renderWithHistory,
  Helper,
  ValidationStub
} from '@/tests/presentation/mocks'
import { AddAccountSpy } from '@/tests/domain/mocks'

type SutTypes = {
  addAccountSpy: AddAccountSpy
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (validationError?: string): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError
  const addAccountSpy = new AddAccountSpy()
  renderWithHistory({
    history,
    Page: () =>
      SignUp({ validation: validationStub, addAccount: addAccountSpy })
  })
  return { addAccountSpy }
}

const simulateValidSubmit = async (
  email: string = faker.internet.email(),
  username: string = faker.internet.userName(),
  password: string = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('username', username)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
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

  it('should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.getByTestId('spinner')).toBeEnabled()
  })

  it('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const email = faker.internet.email()
    const username = faker.internet.userName()
    const password = faker.internet.password()
    await simulateValidSubmit(email, username, password)
    expect(addAccountSpy.params).toEqual({
      email,
      username,
      password,
      passwordConfirmation: password
    })
  })

  it('should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })
})
