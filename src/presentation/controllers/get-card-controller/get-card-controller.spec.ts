import { Validation } from '../../protocols/validation';
import { GetCardController } from './get-card-controller';

describe('GetCard controller', () => {
  test('Should call validation with correct value', async () => {
    class ValidationStub implements Validation {
      validate(input: any): Error | null {
        return null;
      }
    }
    const validationStub = new ValidationStub();
    const validationSpy = jest.spyOn(validationStub, 'validate');
    const sut = new GetCardController(validationStub);

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
