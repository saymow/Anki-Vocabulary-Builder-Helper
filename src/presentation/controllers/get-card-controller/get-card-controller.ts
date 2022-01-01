import { Validation } from '../../protocols/validation';

export class GetCardController {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: any) {
    this.validation.validate(httpRequest.queryParams);

    return null;
  }
}
