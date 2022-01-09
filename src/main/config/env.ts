export const ENV = {
  PORT: process.env.PORT ?? 3333,
  WORDS_API_API_KEY: process.env.WORDS_API_API_KEY as string,
  MONGO_URL: process.env.MONGO_URL as string
}
