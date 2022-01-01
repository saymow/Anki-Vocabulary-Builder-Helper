import { ServerError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols/http'

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: null
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
