import { GetCard } from '../../../domain/usecases/get-card';
import { badRequest, serverError } from '../../helpers/http/http-helper';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class GetCardController implements Controller {
  constructor(private readonly validation: Validation, private readonly getCard: GetCard) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.queryParams);

      if (error) {
        return badRequest(error);
      }

      const { word } = httpRequest.queryParams;

      await this.getCard.execute(word);

      return {
        statusCode: 200,
        body: null,
      };
    } catch (error: any) {
      return serverError(error);
    }
  }
}
