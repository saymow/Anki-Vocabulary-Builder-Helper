import { InvalidParamError } from '@/presentation/errors'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { GetCardData, Controller, HttpRequest, HttpResponse, Validation } from './get-card-data-controller-protocols'

export class GetCardDataController implements Controller {
  constructor (private readonly validation: Validation, private readonly getCardData: GetCardData) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.queryParams)

      if (error) {
        return badRequest(error)
      }

      const { word } = httpRequest.queryParams

      const cardData = await this.getCardData.execute(word)

      if (!cardData) {
        return notFound(new InvalidParamError(word))
      }

      return ok(cardData)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
