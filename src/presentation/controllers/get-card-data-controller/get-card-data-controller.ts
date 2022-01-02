import { GetCardData } from '@/domain/usecases/get-card-data'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

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
        return notFound()
      }

      return ok(cardData)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
