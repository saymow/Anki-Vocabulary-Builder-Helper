import { CardModel } from '../../../domain/models/card';
import { GetCard } from '../../../domain/usecases/get-card';
import { MissingParamError } from '../../errors';
import { badRequest, notFound, ok, serverError } from '../../helpers/http/http-helper';
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

const makeFakeCard = (): CardModel => ({
  word: 'some_word',
  front: 'front_text',
  back: 'back_text',
});

const makeGetCardStub = (): GetCard => {
  class GetCardStub implements GetCard {
    async execute(word: string): Promise<CardModel> {
      return makeFakeCard();
    }
  }

  return new GetCardStub();
};

type SutTypes = {
  sut: GetCardController;
  validationStub: Validation;
  getCardStub: GetCard;
};

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub();
  const getCardStub = makeGetCardStub();
  const sut = new GetCardController(validationStub, getCardStub);

  return { sut, validationStub, getCardStub };
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

  test('Should call GetCard with correct value', async () => {
    const { sut, getCardStub } = makeSut();
    const getCardSpy = jest.spyOn(getCardStub, 'execute');
    await sut.handle(makeFakeRequest());

    expect(getCardSpy).toHaveBeenCalledWith('any_word');
  });

  test('Should return 200 if GetCard returns a card', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(ok(makeFakeCard()));
  });

  test('Should return 404 if GetCard returns null', async () => {
    const { sut, getCardStub } = makeSut();
    jest.spyOn(getCardStub, 'execute').mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(notFound());
  });
});
