import express,  {Express, Request, Response, urlencoded, json} from 'express'
import dotenv from 'dotenv'

import router from './routes/routes';

const app: Express = express()

dotenv.config()

// Middleware
app.use(urlencoded({ extended: true })) // this middleware is used to pass data through the body
app.use(json())

app.use(router)

app.get('/health', (req: Request, res: Response) => {
     res.send('API working')
})

module.exports = app
