import { Validation } from '../../protocols/validation';
import { GetCardController } from './get-card-controller';

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

    await sut.handle({
      queryParams: {
        word: 'any_word',
      },
    });

    expect(validationSpy).toHaveBeenCalledWith({
      word: 'any_word',
    });
  });
});
