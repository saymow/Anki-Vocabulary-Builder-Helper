import { CardModel } from '../models/card';

export interface GetCard {
  execute: (word: string) => Promise<CardModel>;
}
