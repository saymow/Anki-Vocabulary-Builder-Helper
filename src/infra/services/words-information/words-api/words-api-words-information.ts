import { GetWordInformationService, WordInformation } from '@/data/protocols/external/get-word-information-service'
import axios from 'axios'

type WordsApiResponseResult = {
  definition: string
  partOfSpeech: string
  synonyms?: string[]
  examples?: string[]
}

type WordsApiResponse = {
  results?: WordsApiResponseResult[]
}
export class WordsApiWordsInformation implements GetWordInformationService {
  constructor (
    private readonly apiKey: string
  ) { }

  async getInformation (word: string): Promise<WordInformation | null> {
    try {
      const response = await axios.get<WordsApiResponse>(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
        headers: {
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
          'x-rapidapi-key': this.apiKey
        }
      })
      const emptyWordInformation: WordInformation = {
        usageExamples: [],
        meanings: []
      }

      return (response.data.results ?? []).reduce<WordInformation>((wordInformation, result) => {
        const { definition, partOfSpeech, synonyms = [], examples = [] } = result

        wordInformation.usageExamples.push(...examples)
        wordInformation.meanings.push({ definition, partOfSpeech, synonyms })

        return wordInformation
      }, emptyWordInformation)
    } catch (error: any) {
      if (error?.response && error?.response.status === 404) {
        return null
      }

      throw error
    }
  }
}
