import { FieldValidation } from '@/validation/contracts'
import { InvalidFieldError } from '@/validation/errors'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: object): Error {
    return input[this.field]?.length < this.minLength
      ? new InvalidFieldError(this.field)
      : null
  }
}
