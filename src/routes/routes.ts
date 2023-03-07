import { Router } from "express"
import userRouter from './user'
import blogPostsRouter from './blogPosts'
import { errorHandler } from "../middleware/middleware.errorHandler"

const router = Router()

router.use('/api/v1/users', userRouter)
router.use('/api/v1/blogPosts', blogPostsRouter)


export default router;