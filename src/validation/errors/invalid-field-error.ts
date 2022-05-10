export class InvalidFieldError extends Error {
  constructor(paramName: string) {
    super(`Invalid ${paramName}`)
  }
}
