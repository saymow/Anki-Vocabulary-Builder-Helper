import { CardModel } from '@/domain/models/card'

export interface GetCard {
  execute: (word: string) => Promise<CardModel | null>
}
