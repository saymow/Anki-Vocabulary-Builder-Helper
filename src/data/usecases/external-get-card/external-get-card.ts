import { CardModel, GetCard, GetWordInformationService } from './external-get-card-protocols'

export class ExternalGetCard implements GetCard {
  constructor (
    private readonly getWordInformationService: GetWordInformationService
  ) { }

  async execute (word: string): Promise<CardModel | null> {
    const wordInformation = await this.getWordInformationService.getInformation(word)

    if (!wordInformation) {
      return null
    }

    const { definition, usageExamples: [firstUsageExample] } = wordInformation

    return {
      word,
      front: firstUsageExample,
      back: definition
    }
  }
}
