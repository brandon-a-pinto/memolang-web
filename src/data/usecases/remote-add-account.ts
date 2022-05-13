import { AddAccount } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/contracts'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<boolean>
  ) {}

  async add(params: AddAccount.Params): Promise<boolean> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}
