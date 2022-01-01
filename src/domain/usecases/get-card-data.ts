import { CardDataModel } from '@/domain/models/card-data'

export interface GetCardData {
  execute: (word: string) => Promise<CardDataModel | null>
}
