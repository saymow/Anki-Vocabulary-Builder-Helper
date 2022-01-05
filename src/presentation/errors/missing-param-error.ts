export class MissingParamError extends Error {
  /* istanbul ignore next */
  constructor (paramName: string) {
    super(`Missing param ${paramName}`)
    this.name = 'MissingParamError'
  }
}
