import { Authentication } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/contracts'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Model>
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Result
}
