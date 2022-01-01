import { GetWordInformationService, WordInformation, CardModel } from './external-get-card-protocols'
import { ExternalGetCard } from './external-get-card'

const makeFakeWordInformation = (): WordInformation => ({
  definition: 'any_definition',
  usageExamples: ['any_phrase 1', 'any_phrase 2']
})

const makeFakeCard = (): CardModel => ({
  word: 'any_word',
  front: 'any_phrase 1',
  back: 'any_definition'
})

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
  sut: ExternalGetCard
}

const makeSut = (): SutTypes => {
  const getWordInformationServiceStub = makeGetWordInformationServiceStub()
  const sut = new ExternalGetCard(getWordInformationServiceStub)

  return { sut, getWordInformationServiceStub }
}

describe('ExternalGetCard useCase', () => {
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

  test('Should return a card on success', async () => {
    const { sut } = makeSut()
    const card = await sut.execute('any_word')

    expect(card).toEqual(makeFakeCard())
  })
})
