import { AccountModel } from '@/domain/models'

export interface Authentication {
  auth: (params: any) => Promise<AccountModel>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }
}
