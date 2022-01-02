export type CardDataDefinitionModel = {
  definition: string
  partOfSpeech: string
  synonyms: string[]
}

export type CardDataModel = {
  word: string
  usageExamples: string[]
  meanings: CardDataDefinitionModel[]
}
