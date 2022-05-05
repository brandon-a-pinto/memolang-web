import faker from '@faker-js/faker'

import { RemoteAuthentication } from '@/data/usecases'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockAuthenticationParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAuthentication(url, httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteAuthentication Usecase', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const data = mockAuthenticationParams()
    await sut.auth(data)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(data)
  })
})
