import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { makeGetCardDataValidation } from './get-card-data-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('GetCardDataValidation factory', () => {
  test('Should call ValidationComposite with correct Validations', () => {
    makeGetCardDataValidation()

    expect(ValidationComposite).toHaveBeenCalledWith([new RequiredFieldValidation('word')])
  })
})
