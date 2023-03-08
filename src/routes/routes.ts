import { Router } from "express"
import userRouter from './user'
import blogPostsRouter from './blogPosts'
import uploadRouter from './upload'
import { errorHandler } from "../middleware/middleware.errorHandler"

const router = Router()

router.use('/api/v1/users', userRouter)
router.use('/api/v1/blogPosts', blogPostsRouter)
router.use('/api/v1/uploadFile', uploadRouter)



export default router;