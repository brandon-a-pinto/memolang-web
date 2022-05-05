import faker from '@faker-js/faker'

import { Authentication } from '@/domain/usecases'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
