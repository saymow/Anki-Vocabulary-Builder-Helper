import { GetWordInformationService, WordInformation } from '@/data/protocols/external/get-word-information-service'
import { ExternalGetCard } from './external-get-card'

const makeGetWordInformationServiceStub = (): GetWordInformationService => {
  class GetWordInformationServiceStub implements GetWordInformationService {
    async getInformation (word: string): Promise<WordInformation> {
      return await Promise.resolve({
        definition: 'any_definition',
        phrasesExamples: ['any_phrase 1', 'any_phrase 2']
      })
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
})
