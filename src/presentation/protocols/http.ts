export type HttpRequest = {
  queryParams: Record<string, any>
  body?: any
}

export type HttpResponse = {
  statusCode: number
  body: any
}
