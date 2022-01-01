export interface WordInformation {
  definition: string
  usageExamples: string[]
}

export interface GetWordInformationService {
  getInformation: (word: string) => Promise<WordInformation | null>
}
