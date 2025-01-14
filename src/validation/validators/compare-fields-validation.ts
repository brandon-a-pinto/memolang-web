import { FieldValidation } from '@/validation/contracts'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: object): Error {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError(this.fieldToCompare)
      : null
  }
}
