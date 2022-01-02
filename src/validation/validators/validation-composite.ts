import { Validation } from '@/presentation/protocols/validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (input: any): Error | void {
    return new Error()
  }
}
