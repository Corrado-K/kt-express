import express,  {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import router from './routes/routes';

const app: Express = express()

dotenv.config()

// Middleware
app.use(router)

app.get('/health', (req: Request, res: Response) => {
     res.send('API working')
})

module.exports = app
