import { Validation } from '@/presentation/contracts'

export class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate(input: object): string {
    this.input = input
    return this.errorMessage
  }
}
