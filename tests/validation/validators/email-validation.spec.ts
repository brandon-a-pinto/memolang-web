import faker from '@faker-js/faker'

import { EmailValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

const field = faker.random.word()

const makeSut = (): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError(field))
  })
})
