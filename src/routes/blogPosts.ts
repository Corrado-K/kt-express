import { Router } from "express"
import { addPost, deletePost, getAll, getById, updatePost,addComment, getAllComments, getCommentsByID, updateComment, deleteComment } from "../controllers/blogPost.controller"

const router = Router()

router.post('/', addPost)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

// Blog post comments' rest api
router.post('/:id/comments/', addComment)
router.get('/:id/comments/', getAllComments)
router.get('/:id/comments/:cid', getCommentsByID)
router.put('/:id/comments/:cid', updateComment)
router.delete('/:id/comments/:cid', deleteComment)


export default router
