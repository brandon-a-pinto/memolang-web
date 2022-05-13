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
})
