import axios from 'axios'

import { AxiosHttpClient } from '@/infra/http'
import { mockAxios, mockHttpResponse } from '@/tests/infra/mocks'
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

  it('should return correct response', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  it('should return correct error', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.request.mockRejectedValue({
      response: mockHttpResponse()
    })
    const res = sut.request(mockHttpRequest())
    expect(res).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
