import faker from '@faker-js/faker'

import { ValidationComposite } from '@/validation/validators'
import { FieldValidationSpy } from '@/tests/validation/mocks'

const field = faker.random.word()
const input = faker.datatype.json()

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy(field),
    new FieldValidationSpy(field)
  ]
  const sut = ValidationComposite.build(fieldValidationSpy)
  return { sut, fieldValidationSpy }
}

describe('ValidationComposite', () => {
  it('should return error if any Validation fails', () => {
    const { sut, fieldValidationSpy } = makeSut()
    const errorMessage = faker.random.words()
    fieldValidationSpy[0].error = new Error(errorMessage)
    fieldValidationSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(field, { input })
    expect(error).toBe(errorMessage)
  })

  it('should return falsy if every Validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate(field, { input })
    expect(error).toBeFalsy()
  })
})
