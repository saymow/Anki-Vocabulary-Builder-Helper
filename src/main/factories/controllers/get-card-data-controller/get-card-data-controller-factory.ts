import { GetCardDataController } from '@/presentation/controllers/get-card-data-controller/get-card-data-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeExternalGetCardData } from '@/main/factories/usecases/external-get-card-data/external-get-card-data-factory'
import { makeGetCardDataValidation } from './get-card-data-validation-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeGetCardDataController = (): Controller => {
  return makeLogControllerDecorator(new GetCardDataController(makeGetCardDataValidation(), makeExternalGetCardData()))
}
