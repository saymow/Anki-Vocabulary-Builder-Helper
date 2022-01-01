import { MissingParamError } from '../../errors';
import { badRequest, serverError } from '../../helpers/http/http-helper';
import { HttpRequest } from '../../protocols/http';
import { Validation } from '../../protocols/validation';
import { GetCardController } from './get-card-controller';

const makeFakeRequest = (): HttpRequest => ({
  queryParams: {
    word: 'any_word',
  },
});

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }

  return new ValidationStub();
};

type SutTypes = {
  sut: GetCardController;
  validationStub: Validation;
};

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub();
  const sut = new GetCardController(validationStub);

  return { sut, validationStub };
};

describe('GetCard controller', () => {
  test('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut();
    const validationSpy = jest.spyOn(validationStub, 'validate');
    await sut.handle(makeFakeRequest());

    expect(validationSpy).toHaveBeenCalledWith({
      word: 'any_word',
    });
  });

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockImplementation(() => new MissingParamError('word'));
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(badRequest(new MissingParamError('word')));
  });

  test('Should return 500 if validation throws', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockImplementation(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
