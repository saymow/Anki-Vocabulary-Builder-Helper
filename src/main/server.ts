import 'module-alias/register'
import app from '@/main/config/app'
import { ENV } from './config/env'

app.listen(ENV.PORT, () => console.log(`Server is up and running on port: ${ENV.PORT}`))
