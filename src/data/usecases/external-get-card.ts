import { CardModel } from '@/domain/models/card'
import { GetCard } from '@/domain/usecases/get-card'
import { GetWordInformationService } from '../protocols/external/get-word-information-service'

export class ExternalGetCard implements GetCard {
  constructor (
    private readonly getWordInformationService: GetWordInformationService
  ) {}

  async execute (word: string): Promise<CardModel | null> {
    await this.getWordInformationService.getInformation(word)
    return null
  }
}
