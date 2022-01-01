import { GetCard } from '@/domain/usecases/get-card'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class GetCardController implements Controller {
  constructor (private readonly validation: Validation, private readonly getCard: GetCard) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.queryParams)

      if (error) {
        return badRequest(error)
      }

      const { word } = httpRequest.queryParams

      const card = await this.getCard.execute(word)

      if (!card) {
        return notFound()
      }

      return ok(card)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
