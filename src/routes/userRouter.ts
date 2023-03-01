import { Request, Response, Router } from "express"

const router = Router()

router.get('/', (req: Request, res: Response) => {
     res.json({
          message: `User: ${JSON.stringify(req.query)}`,
          status: 200,
          payload: req.query
     })
})

export default router