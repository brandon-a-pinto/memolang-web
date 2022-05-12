export class RequiredFieldError extends Error {
  constructor() {
    super('* Required')
  }
}
