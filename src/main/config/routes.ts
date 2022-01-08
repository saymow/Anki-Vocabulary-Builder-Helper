import { Express, Router } from 'express'
import path from 'path'
import { readdirSync } from 'fs'

export default async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/api', router)

  readdirSync(path.resolve(__dirname, '..', 'routes')).forEach(async (fileName) => {
    if (!fileName.includes('.test.') && !fileName.includes('.map')) {
      (await import(path.resolve(__dirname, '..', 'routes', fileName))).default(router)
    }
  })
}
