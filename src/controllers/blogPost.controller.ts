import { Request, Response } from "express";
import IBlogPost from "../interfaces/IBlogPost";
import { randomInt } from 'crypto';

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

export const getAll = (req: Request, res: Response) => {
     res.send({
          message: `All posts`,
          status: 200,
          payload: blogPosts
     })
}

export const getById = (req: Request, res: Response) => {

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
}

export const addPost = (req: Request, res: Response) => {

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
}

export const updatePost = (req: Request, res: Response) => {
     const blogPost: IBlogPost | undefined = blogPosts.find((i:IBlogPost) => i.id === Number(req.params.id))
     // const blogPost: IBlogPost | undefined = findBlogPost(Number(req.params.id))

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

}

export const deletePost = (req: Request, res: Response) => {
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

}


// COMMENTS

export const addComment = (req: Request, res: Response) => {
     const blogPost: IBlogPost | undefined = blogPosts.find((i:IBlogPost) => i.id === Number(req.params.id))

     if (!blogPost) {
          res.status(404).json({
               errors: [{ message: `Blog post ${req.params.id} was not found` }],
          })
     }else{
          // add new comment to the blog post
          const comments = blogPost.comments
          const { comment } = req.body
          
          comments?.push(comment)

          res.send({
               message: 'Comment created',
               status: 200,
               payload: comments
          })
     }
} 


export const getAllComments = (req: Request, res: Response) => {

     const blogPost: IBlogPost | undefined = blogPosts.find((i:IBlogPost) => i.id === Number(req.params.id))

     if (!blogPost) {
          res.status(404).json({
               errors: [{ message: `Blog post ${req.params.id} was not found` }],
          })
     }else{
          // get all the comments in the blog post
          const comments = blogPost.comments
          
          res.send({
               message: 'Comment found',
               status: 200,
               payload: comments
          })
     }
} 

export const getCommentsByID = (req: Request, res: Response) => {
     const blogPost: IBlogPost | undefined = blogPosts.find((i:IBlogPost) => i.id === Number(req.params.id))

     if (!blogPost) {
          res.status(404).json({
               errors: [{ message: `Blog post ${req.params.id} was not found` }],
          })
     }else{
          const comments = blogPost.comments ?  blogPost.comments[Number(req.params.cid)] : null
          
          res.send({
               message: 'Comment found',
               status: 200,
               payload: comments
          })
     }
} 

export const updateComment = (req: Request, res: Response) => {
     const blogPost: IBlogPost | undefined = blogPosts.find((i:IBlogPost) => i.id === Number(req.params.id))

     if (!blogPost) {
          res.status(404).json({
               errors: [{ message: `Blog post ${req.params.id} was not found` }],
          })
     }else{
          // update a comments in the blog post
          const { comment } = req.body

          blogPost.comments ? blogPost.comments[Number(req.params.cid)] = comment : null
          
          res.send({
               message: 'Comment update',
               status: 200,
               payload: blogPost.comments
          })
     }
} 

export const deleteComment = (req: Request, res: Response) => {
     const blogPost: IBlogPost | undefined = blogPosts.find((i:IBlogPost) => i.id === Number(req.params.id))

     if (!blogPost) {
          res.status(404).json({
               errors: [{ message: `Blog post ${req.params.id} was not found` }],
          })
     }else{
          // update a comments in the blog post
          const newCommentList = blogPost.comments ? blogPost.comments.filter((i) => i !== ( blogPost.comments ? blogPost.comments[Number(req.params.cid)] : null)) : null
          
          res.send({
               message: 'Comment deleted',
               status: 200,
               payload: newCommentList
          })
     }
} 