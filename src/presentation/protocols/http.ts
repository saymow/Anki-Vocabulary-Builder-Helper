export type HttpRequest = {
  queryParams: Record<string, string>;
  body?: any;
};

export type HttpResponse = {
  statusCode: number;
  body: any;
};
