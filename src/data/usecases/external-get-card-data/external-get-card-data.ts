import { CardDataModel, GetCardData, GetWordInformationService } from './external-get-card-data-protocols'

export class ExternalGetCardData implements GetCardData {
  constructor (
    private readonly getWordInformationService: GetWordInformationService
  ) { }

  async execute (word: string): Promise<CardDataModel | null> {
    const wordInformation = await this.getWordInformationService.getInformation(word)

    if (!wordInformation) {
      return null
    }

    return Object.assign({ word }, wordInformation)
  }
}
