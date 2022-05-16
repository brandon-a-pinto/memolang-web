import {
  ValidationComposite,
  ValidationBuilder as Builder
} from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field('email').required().email().build(),
    ...Builder.field('username').required().min(5).build(),
    ...Builder.field('password').required().min(8).build(),
    ...Builder.field('passwordConfirmation')
      .required()
      .sameAs('password')
      .build()
  ])
