import { makeSignUpValidation } from '@/main/factories/validation'
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation
} from '@/validation/validators'

describe('LoginValidationFactory', () => {
  test('should call ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()

    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('username'),
        new MinLengthValidation('username', 5),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 8),
        new RequiredFieldValidation('passwordConfirmation'),
        new CompareFieldsValidation('passwordConfirmation', 'password')
      ])
    )
  })
})
