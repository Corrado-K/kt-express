import { randomInt } from "crypto"
import { Request, Response, Router } from "express"

const router = Router()

interface IBlogPost {
     id: number,
     title: string,
     post: string,
     comments?: string[]
}

let blogPosts: IBlogPost[] = [
     {
          id:1,
          title:'Let the post post',
          post:'Lorem ipsum notey blau inscim rhat yousah',
          comments:['Good', 'horrible', 'interesting']
     },
     {
          id:2,
          title:'Let the post post',
          post:'Lorem ipsum notey blau inscim rhat yousah',
          comments:['Good', 'horrible', 'interesting']
     },
     {
          id:3,
          title:'Let the post post',
          post:'Lorem ipsum notey blau inscim rhat yousah',
          comments:['Good', 'horrible', 'interesting']
     }
]

const findBlogPost = (id:number) => {
     const blogPost : IBlogPost | undefined = blogPosts.find((i) => i.id === Number(id))
     return blogPost
}

router.get('/', (req: Request, res: Response) => {
     res.send({
          message: `All posts`,
          status: 200,
          payload: blogPosts
     })
})

router.get('/:id', (req: Request, res: Response) => {

     const blogPost: IBlogPost | undefined = blogPosts.find((i:IBlogPost) => i.id === Number(req.params.id))

     if(!blogPost) {
          res.status(404).json({
               errors: [{ message: `Blog post ${req.params.id} was not found` }],
          })
     }

     res.send({
          message: `Blog posts ${req.params.id} found`,
          status: 200,
          payload: blogPost
     })
})

router.post('/', (req: Request, res: Response) => {

     const { title, post, comment } = req.body

     const blogPost: IBlogPost = {
          id: randomInt(100),
          title: title,
          post: post,
          comments: comment ? comment : null
     }
     
     blogPosts.push(blogPost)
     
     res.json({
          message: `User created`,
          status: 200,
          payload: blogPosts
     })
})

router.put('/:id', (req: Request, res: Response) => {
     // const blogPost: IBlogPost | undefined = blogPosts.find((i:IBlogPost) => i.id === Number(req.params.id))
     const blogPost: IBlogPost | undefined = findBlogPost(Number(req.params.id))

     if (!blogPost) {
          res.status(404).json({
               errors: [{ message: `Blog post ${req.params.id} was not found` }],
          })
     }
     else {
          const { title, post } = req.body
          blogPost.title = title
          blogPost.post = post
     
          res.send({
               message: `Blog post ${req.params.id} updated`,
               status: 200,
               payload: blogPost
          })
     }

})

router.delete('/:id', (req: Request, res: Response) => {
     const blogPost: IBlogPost | undefined = blogPosts.find((i:IBlogPost) => i.id === Number(req.params.id))

     if (!blogPost) {
          res.status(404).json({
               errors: [{ message: `Blog post ${req.params.id} was not found` }],
          })
     }

     const newBlogPostList:IBlogPost[] = blogPosts.filter((i) => i !== blogPost)

     res.send({
          message: `User deleted`,
          status: 200,
          payload: newBlogPostList
     })

})

export default router
