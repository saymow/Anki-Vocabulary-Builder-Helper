import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { LogControllerDecorator } from './log-controller-decorator'

const mockController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return mockHttpResponse()
    }
  }

  return new ControllerStub()
}

const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {}
  }

  return new LogErrorRepositoryStub()
}

const mockHttpRequest = (): HttpRequest => ({
  queryParams: {},
  body: { test: true }
})

const mockHttpResponse = (): HttpResponse => ok({ success: true })

const mockServerError = (): HttpResponse => {
  const error = new Error()
  error.stack = 'any_stack'
  return serverError(error)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = mockController()
  const logErrorRepositoryStub = mockLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return { sut, controllerStub, logErrorRepositoryStub }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle with correct value', async () => {
    const { sut, controllerStub } = makeSut()
    const controllerHandleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(mockHttpRequest())

    expect(controllerHandleSpy).toHaveBeenCalledWith(mockHttpRequest())
  })

  test('Should return controller return value', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockHttpRequest())

    expect(httpResponse).toEqual(mockHttpResponse())
  })

  test('Should call LogErrorRepository with correct values if controller returns server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(mockServerError()))
    const logErrorSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    await sut.handle(mockHttpRequest())

    expect(logErrorSpy).toHaveBeenLastCalledWith('any_stack')
  })
})
