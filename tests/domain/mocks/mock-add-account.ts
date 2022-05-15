import faker from '@faker-js/faker'

import { AddAccount } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password,
    passwordConfirmation: password
  }
}

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = true
  callsCount = 0

  async add(params: AddAccount.Params): Promise<boolean> {
    this.params = params
    this.callsCount++
    return this.result
  }
}
