import faker from '@faker-js/faker'

import { RemoteAddAccount } from '@/data/usecases'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAddAccount(url, httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteAddAccount Usecase', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const data = mockAddAccountParams()
    await sut.add(data)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(data)
  })
})
