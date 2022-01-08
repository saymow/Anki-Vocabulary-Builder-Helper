export class InvalidParamError extends Error {
  /* istanbul ignore next */
  constructor (paramName: string) {
    super(`Invalid param ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
