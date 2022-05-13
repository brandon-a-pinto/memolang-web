import { screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { SignUp } from '@/presentation/pages'
import { renderWithHistory, Helper } from '@/tests/presentation/mocks'

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (): void => {
  renderWithHistory({
    history,
    Page: () => SignUp({})
  })
}

describe('SignUp Component', () => {
  it('should start with initial state', () => {
    const validationError = 'Invalid field'
    makeSut()
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('username', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('email', validationError)
  })
})
