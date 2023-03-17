import { Request, Response, Router } from "express";
import { testMiddleware, asyncMiddlewareTest } from '../controllers/testMiddleware';

const router = Router()

router.get('/', testMiddleware)
router.get('/async', asyncMiddlewareTest)

export default router