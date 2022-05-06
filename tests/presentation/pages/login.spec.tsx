import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { Login } from '@/presentation/pages'

const makeSut = () => {
  const sut = render(<Login />)
  return { sut }
}

describe('Login Component', () => {
  beforeEach(cleanup)

  it('should start with initial state', async () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
})
