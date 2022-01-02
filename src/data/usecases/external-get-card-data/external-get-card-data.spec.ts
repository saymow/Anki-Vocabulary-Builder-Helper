import { GetWordInformationService, WordInformation, CardDataModel } from './external-get-card-data-protocols'
import { ExternalGetCardData } from './external-get-card-data'

const makeFakeWordInformation = (): WordInformation => ({
  usageExamples: ['first_example', 'second_example'],
  meanings: [
    {
      definition: 'any_definition',
      partOfSpeech: 'verb',
      synonyms: ['synonym 1', 'synonym 2']
    },
    {
      definition: 'any_definition 2',
      partOfSpeech: 'noun',
      synonyms: ['synonym 1', 'synonym 2']
    }
  ]
})

const makeFakeCardData = (): CardDataModel => Object.assign({ word: 'any_word' }, makeFakeWordInformation())

const makeGetWordInformationServiceStub = (): GetWordInformationService => {
  class GetWordInformationServiceStub implements GetWordInformationService {
    async getInformation (word: string): Promise<WordInformation> {
      return await Promise.resolve(makeFakeWordInformation())
    }
  }

  return new GetWordInformationServiceStub()
}

type SutTypes = {
  getWordInformationServiceStub: GetWordInformationService
  sut: ExternalGetCardData
}

const makeSut = (): SutTypes => {
  const getWordInformationServiceStub = makeGetWordInformationServiceStub()
  const sut = new ExternalGetCardData(getWordInformationServiceStub)

  return { sut, getWordInformationServiceStub }
}

describe('ExternalGetCardData useCase', () => {
  test('Should call GetWordInformationService with correct value', async () => {
    const { sut, getWordInformationServiceStub } = makeSut()
    const getInformationSpy = jest.spyOn(getWordInformationServiceStub, 'getInformation')

    await sut.execute('any_word')

    expect(getInformationSpy).toBeCalledWith('any_word')
  })

  test('Should return null if GetWordInformationService returns null', async () => {
    const { sut, getWordInformationServiceStub } = makeSut()
    jest.spyOn(getWordInformationServiceStub, 'getInformation').mockReturnValueOnce(Promise.resolve(null))

    const card = await sut.execute('any_word')

    expect(card).toBeNull()
  })

  test('Should throw if GetWordInformationService throws', async () => {
    const { sut, getWordInformationServiceStub } = makeSut()
    jest.spyOn(getWordInformationServiceStub, 'getInformation').mockImplementationOnce(() => { throw new Error() })

    await expect(sut.execute('any_word')).rejects.toThrow()
  })

  test('Should return a cardData on success', async () => {
    const { sut } = makeSut()
    const cardData = await sut.execute('any_word')

    expect(cardData).toEqual(makeFakeCardData())
  })
})
