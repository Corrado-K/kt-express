import { Router } from "express"
import userRouter from './userRouter'
import blogPostsRouter from './blogPostsRouter'

const router = Router()

router.use('/api/v1/users', userRouter)
router.use('/api/v1/blogPosts', blogPostsRouter)

export default router;