export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<boolean>
}

export namespace AddAccount {
  export type Params = {
    email: string
    username: string
    password: string
    passwordConfirmation: string
  }
}
