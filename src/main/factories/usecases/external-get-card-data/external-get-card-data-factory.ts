import { ExternalGetCardData } from '@/data/usecases/external-get-card-data/external-get-card-data'
import { WordsApiWordsInformation } from '@/infra/services/words-information/words-api/words-api-words-information'
import { ENV } from '@/main/config/env'

export const makeExternalGetCardData = (): ExternalGetCardData => {
  return new ExternalGetCardData(new WordsApiWordsInformation(ENV.WORDS_API_API_KEY))
}
