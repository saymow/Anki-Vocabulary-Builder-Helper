import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class GetCardController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.queryParams);

    return {
      statusCode: 200,
      body: null,
    };
  }
}
