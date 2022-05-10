import faker from '@faker-js/faker'

import {
  ValidationBuilder as sut,
  RequiredFieldValidation
} from '@/validation/validators'

const field = faker.random.words()

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })
})
