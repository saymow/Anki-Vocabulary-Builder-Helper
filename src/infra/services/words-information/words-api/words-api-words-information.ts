import { GetWordInformationService, WordInformation } from '@/data/protocols/external/get-word-information-service'
import axios from 'axios'

export class WordsApiWordsInformation implements GetWordInformationService {
  constructor (
    private readonly apiKey: string
  ) {}

  async getInformation (word: string): Promise<WordInformation | null> {
    await axios.get(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
      headers: {
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        'x-rapidapi-key': this.apiKey
      }
    })
    return null
  }
}
