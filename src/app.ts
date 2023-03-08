import express,  {Express, Request, Response, urlencoded, json} from 'express'
import dotenv from 'dotenv'
import compression from 'compression'
import multer from 'multer'

import path from 'path'

// Custom middleware
import { requestLogger } from './middleware/middleware.requestLogger'
import { errorHandler } from './middleware/middleware.errorHandler'

import router from './routes/routes'
import { responseLogger } from './middleware/middleware.responseLogger'
import { rateLimiter } from './middleware/middleware.rateLimiter'
import { requestLimitPerIP } from './middleware/middleware.requestLimitPerIP'
import { userValidationRules, validateUser } from './middleware/middleware.validateUser'



const app: Express = express()
const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, 'uploads')
     },
     filename: (req, file, cb) => {
          console.log(file)
          cb(null, Date.now() + path.extname(file.originalname))
     }
})
const upload = multer({storage: storage})

dotenv.config()

// Middleware
app.use(urlencoded({ extended: true })) // this middleware is used to pass data through the body
app.use(json())

// Third-party middleware packages
// app.use(cors())
// app.use(helmet())
app.use(compression()) // compresses outgoing responses to reduce their size and improve the server’s performance.

app.use(requestLogger) // middleware that logs each incoming request and its parameters to the console
app.use(responseLogger) // middleware that logs the response time for a request

app.use(rateLimiter)
app.use(requestLimitPerIP)

// app.use(userValidationRules(), validateUser)

// multer.. for file upload
app.use(upload.single('avatar'))

// routing
app.use(router)

// error handling middleware comes after the router
app.use(errorHandler)

// app.get('/health', (req: Request, res: Response) => {
//      res.send('API working')
// })

module.exports = app
