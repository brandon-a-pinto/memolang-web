import { FieldValidation } from '@/validation/contracts'
import {
  RequiredFieldValidation,
  EmailValidation
} from '@/validation/validators'
import { CompareFieldsValidation } from './compare-fields-validation'
import { MinLengthValidation } from './min-length-validation'

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  sameAs(fieldToCompare: string): ValidationBuilder {
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare)
    )
    return this
  }

  build(): FieldValidation[] {
    return this.validations
  }
}
