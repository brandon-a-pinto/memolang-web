import React, { ReactNode } from 'react'

import { SignUp } from '@/presentation/pages'
import { makeRemoteAddAccount } from '@/main/factories/usecases'
import { makeSignUpValidation } from '@/main/factories/validation'

export const makeSignUp: ReactNode = (
  <SignUp
    validation={makeSignUpValidation()}
    addAccount={makeRemoteAddAccount()}
  />
)
