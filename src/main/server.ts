import 'module-alias/register'
import { ENV } from './config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

void (async () => {
  await MongoHelper.connect(ENV.MONGO_URL)
  const app = (await import('./config/app')).default

  app.listen(ENV.PORT, () => console.log('Server is up and running on port:', ENV.PORT))
})().catch((error) => {
  console.error('Server startup error:', error)
})
