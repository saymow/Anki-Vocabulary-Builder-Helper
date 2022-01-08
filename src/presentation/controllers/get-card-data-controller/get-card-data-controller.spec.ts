import { GetCardDataController } from './get-card-data-controller'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { CardDataModel } from '@/domain/models/card-data'
import { GetCardData } from '@/domain/usecases/get-card-data'

const makeFakeRequest = (): HttpRequest => ({
  queryParams: {
    word: 'any_word'
  }
})

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | void {}
  }

  return new ValidationStub()
}

const makeFakeCardData = (): CardDataModel => ({
  word: 'some_word',
  usageExamples: ['any_usage_example'],
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

const makeGetCardDataStub = (): GetCardData => {
  class GetCardStub implements GetCardData {
    async execute (word: string): Promise<CardDataModel> {
      return makeFakeCardData()
    }
  }

  return new GetCardStub()
}

type SutTypes = {
  sut: GetCardDataController
  validationStub: Validation
  getCardDataStub: GetCardData
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const getCardDataStub = makeGetCardDataStub()
  const sut = new GetCardDataController(validationStub, getCardDataStub)

  return { sut, validationStub, getCardDataStub }
}

describe('GetCardDataController', () => {
  test('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())

    expect(validationSpy).toHaveBeenCalledWith({
      word: 'any_word'
    })
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementation(() => new MissingParamError('word'))
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(badRequest(new MissingParamError('word')))
  })

  test('Should return 500 if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementation(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call GetCardData with correct value', async () => {
    const { sut, getCardDataStub } = makeSut()
    const getCardSpy = jest.spyOn(getCardDataStub, 'execute')
    await sut.handle(makeFakeRequest())

    expect(getCardSpy).toHaveBeenCalledWith('any_word')
  })

  test('Should return 200 if GetCard returns a cardData', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(ok(makeFakeCardData()))
  })

  test('Should return 404 if GetCardData returns null', async () => {
    const { sut, getCardDataStub } = makeSut()
    jest.spyOn(getCardDataStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(notFound(new InvalidParamError('any_word')))
  })

  test('Should return 500 if GetCardData throws', async () => {
    const { sut, getCardDataStub } = makeSut()
    jest.spyOn(getCardDataStub, 'execute').mockImplementation(() => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
