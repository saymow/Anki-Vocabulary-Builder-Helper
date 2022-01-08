import { Express, Router } from 'express'
import path from 'path'
import { readdirSync } from 'fs'

export default async (app: Express): Promise<void> => {
  const router = Router()
  router.use('/api', router)
  const namePartsBlackList = ['.test.', '.map']

  readdirSync(path.resolve(__dirname, '..', 'routes')).forEach(async (fileName) => {
    if (namePartsBlackList.every((namePart) => !fileName.includes(namePart))) {
      (await import(path.resolve(__dirname, '..', 'routes', fileName))).default(router)
    }
  })
}
