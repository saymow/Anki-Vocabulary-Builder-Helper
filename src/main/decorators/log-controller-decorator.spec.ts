import { ok } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { LogControllerDecorator } from './log-controller-decorator'

const mockController = (): Controller => {
  class GenericController implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return ok({ success: true })
    }
  }

  return new GenericController()
}

const mockHttpRequest = (): HttpRequest => ({
  queryParams: {},
  body: { test: true }
})

type SutTypes = {
  sut: LogControllerDecorator
  controller: Controller
}

const makeSut = (): SutTypes => {
  const controller = mockController()
  const sut = new LogControllerDecorator(controller)

  return { sut, controller }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle with correct value', async () => {
    const { sut, controller } = makeSut()
    const httpRequest = mockHttpRequest()
    const controllerHandleSpy = jest.spyOn(controller, 'handle')

    await sut.handle(httpRequest)

    expect(controllerHandleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
