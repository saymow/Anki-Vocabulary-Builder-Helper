export class ServerError extends Error {
  /* istanbul ignore next */
  constructor (stack?: string) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
