import { MongoLogRepository } from '@/infra/db/mongodb/log/mongo-log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols/controller'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  return new LogControllerDecorator(controller, new MongoLogRepository())
}
