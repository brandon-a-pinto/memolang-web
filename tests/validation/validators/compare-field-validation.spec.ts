import faker from '@faker-js/faker'

import { CompareFieldsValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

const field = faker.internet.password()

const makeSut = (fieldToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const fieldToCompare = 'invalid_field'
    const sut = makeSut(fieldToCompare)
    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value'
    })
    expect(error).toEqual(new InvalidFieldError(fieldToCompare))
  })
})
