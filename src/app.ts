import express,  {Express, Request, Response, urlencoded, json} from 'express'
import dotenv from 'dotenv'

import router from './routes/routes';
import { connectDatabase } from './config/database';
import { handleError } from './middleware/middleware.handleError';
import { errorLogger } from './util/errorLogger';

const app: Express = express()

dotenv.config()

//Database Connection
connectDatabase();

// Middleware
app.use(urlencoded({ extended: true })) // this middleware is used to pass data through the body
app.use(json())

// router
app.use(router)

// error handler
app.use(errorLogger)
app.use(handleError)


app.get('/health', (req: Request, res: Response) => {
     res.send('API working')
})

module.exports = app
