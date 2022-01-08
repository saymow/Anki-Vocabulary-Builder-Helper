import { adaptRoute } from '@/main/adapter/express-router-adapter'
import { makeGetCardDataController } from '@/main/factories/controllers/get-card-data-controller/get-card-data-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/card-data', adaptRoute(makeGetCardDataController()))
}
