import faker from '@faker-js/faker'

import { MinLengthValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

const field = faker.random.word()

const makeSut = (): MinLengthValidation => new MinLengthValidation(field, 6)

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toEqual(new InvalidFieldError(field))
  })

  it('should return falsy if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: faker.random.alphaNumeric(6) })
    expect(error).toBeFalsy()
  })
})
