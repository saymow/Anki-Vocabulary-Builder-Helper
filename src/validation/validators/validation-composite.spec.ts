import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from './validation-composite'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | void {}
  }

  return new ValidationStub()
}

type SutTypes = {
  validationsStubs: Validation[]
  sut: ValidationComposite
}

const makeSut = (): SutTypes => {
  const validationsStubs = [makeValidationStub(), makeValidationStub()]
  const sut = new ValidationComposite(validationsStubs)

  return { sut, validationsStubs }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationsStubs } = makeSut()
    jest.spyOn(validationsStubs[1], 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate({ field: 'any_field' })

    expect(error).toEqual(new Error())
  })

  test('Should return the first faced error', () => {
    const { sut, validationsStubs } = makeSut()
    jest.spyOn(validationsStubs[0], 'validate').mockReturnValueOnce(new Error('first error'))
    jest.spyOn(validationsStubs[1], 'validate').mockReturnValueOnce(new Error('second error'))
    const error = sut.validate({ field: 'any_field' })

    expect(error).toEqual(new Error('first error'))
  })

  test('Should not return if Validations does not returns errors', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_field' })

    expect(error).toBeFalsy()
  })
})
