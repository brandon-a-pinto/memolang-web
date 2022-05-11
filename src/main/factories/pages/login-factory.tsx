import React, { ReactNode } from 'react'

import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { makeLoginValidation } from '@/main/factories/validation'

export const makeLogin: ReactNode = (
  <Login
    authentication={makeRemoteAuthentication()}
    validation={makeLoginValidation()}
  />
)
