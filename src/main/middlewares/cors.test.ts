import app from '@/main/config/app'
import { Request, Response } from 'express'
import request from 'supertest'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_content_type', (req: Request, res: Response) => { res.send('') })

    await request(app)
      .get('/test_content_type')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
