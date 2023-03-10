import { Router } from "express"
import userRouter from './user'
import blogPostsRouter from './blogPosts'

const router = Router()
// new comment

router.use('/api/v1/users', userRouter)
router.use('/api/v1/blogPosts', blogPostsRouter)

export default router;