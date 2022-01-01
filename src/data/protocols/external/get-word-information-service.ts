export interface WordInformation {
  definitions: string[]
  usageExamples: string[]
}

export interface GetWordInformationService {
  getInformation: (word: string) => Promise<WordInformation | null>
}
