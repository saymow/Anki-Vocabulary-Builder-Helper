export interface WordInformation {
  definition: string
  phrasesExamples: string[]
}

export interface GetWordInformationService {
  getInformation: (word: string) => Promise<WordInformation>
}
