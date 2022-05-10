import { FieldValidation } from '@/validation/contracts'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null

  constructor(readonly field: string) {}

  validate(_input: object): Error {
    return this.error
  }
}
