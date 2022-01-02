export type WordInformationMeanings = {
  definition: string
  partOfSpeech: string
  synonyms: string[]
}
export interface WordInformation {
  usageExamples: string[]
  meanings: WordInformationMeanings[]
}

export interface GetWordInformationService {
  getInformation: (word: string) => Promise<WordInformation | null>
}
