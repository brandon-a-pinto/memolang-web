import { Validation } from '@/presentation/contracts'

export class ValidationStub implements Validation {
  errorMessage: string

  validate(_fieldName: string, _input: object): string {
    return this.errorMessage
  }
}
