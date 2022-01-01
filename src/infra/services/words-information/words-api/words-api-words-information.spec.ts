
import axios, { AxiosRequestConfig } from 'axios'
import { WordsApiWordsInformation } from './words-api-words-information'

jest.mock('axios')

describe('Words Information Words Api Service', () => {
  describe('getInformation()', () => {
    test('Should make external request with correct values', async () => {
      const sut = new WordsApiWordsInformation('any_key')

      await sut.getInformation('table')

      expect(axios.get).toHaveBeenCalledWith(
        'https://wordsapiv1.p.rapidapi.com/words/table',
        {
          headers: {
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
            'x-rapidapi-key': 'any_key'
          }
        } as AxiosRequestConfig
      )
    })
  })
})
