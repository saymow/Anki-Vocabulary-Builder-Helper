import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const makeGetCardDataValidation = (): ValidationComposite => {
  return new ValidationComposite([new RequiredFieldValidation('word')])
}
