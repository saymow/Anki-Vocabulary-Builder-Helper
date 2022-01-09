import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { MongoLogRepository } from './mongo-log-repository'

const makeSut = (): MongoLogRepository => {
  return new MongoLogRepository()
}

describe('MongoLogRepository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  describe('logError()', () => {
    test('Should create an error log on success', async () => {
      const sut = makeSut()
      await sut.logError('any_stack')
      const errorsCount = await errorCollection.countDocuments()

      expect(errorsCount).toBe(1)
    })
  })
})
