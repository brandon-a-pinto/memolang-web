import axios from 'axios'

import { AxiosHttpClient } from '@/infra/http'
import { mockAxios } from '@/tests/infra/mocks'
import { mockHttpRequest } from '@/tests/data/mocks'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const data = mockHttpRequest()
    await sut.request(data)
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: data.url,
      data: data.body,
      method: data.method,
      headers: data.headers
    })
  })
})
