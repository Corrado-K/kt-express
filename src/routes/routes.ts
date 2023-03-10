import { Router } from "express"
import userRouter from './user'
import blogPostsRouter from './blogPosts'
import numberSquareRouter from './numberSquare'

const router = Router()

router.use('/api/v1/users', userRouter)
router.use('/api/v1/blogPosts', blogPostsRouter)
router.use('/api/v1/numberSquare', numberSquareRouter)

export default router;