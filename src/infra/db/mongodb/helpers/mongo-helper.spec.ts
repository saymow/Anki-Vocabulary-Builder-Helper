import { MongoHelper as sut } from './mongo-helper'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let someCollection = await sut.getCollection('some-collection')

    expect(someCollection).toBeTruthy()

    await sut.disconnect()

    someCollection = await sut.getCollection('some-collection')

    expect(someCollection).toBeTruthy()
  })
})
