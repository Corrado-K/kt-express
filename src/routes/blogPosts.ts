import { randomInt } from "crypto"
import { Request, Response, Router } from "express"
import { addPost, deletePost, getAll, getById, updatePost,addComment, getAllComments, getCommentsByID, updateComment, deleteComment } from "../controllers/blogPost.controller"

const router = Router()


// let blogPosts: IBlogPost[] = [
//      {
//           id:1,
//           title:'Let the post post',
//           post:'Lorem ipsum notey blau inscim rhat yousah',
//           comments:['Good', 'horrible', 'interesting']
//      },
//      {
//           id:2,
//           title:'Let the post post',
//           post:'Lorem ipsum notey blau inscim rhat yousah',
//           comments:['Good', 'horrible', 'interesting']
//      },
//      {
//           id:3,
//           title:'Let the post post',
//           post:'Lorem ipsum notey blau inscim rhat yousah',
//           comments:['Good', 'horrible', 'interesting']
//      }
// ]

// const findBlogPost = (id:number) => {
//      const blogPost : IBlogPost | undefined = blogPosts.find((i) => i.id === Number(id))
//      return blogPost
// }


// Blog post rest api
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
