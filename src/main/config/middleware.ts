import { bodyParser } from '@/main/middlewares/body-parser'
import { contentType } from '@/main/middlewares/content-type'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
}
