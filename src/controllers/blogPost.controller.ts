import { Request, Response } from "express";
import IBlogPost from "../interfaces/IBlogPost";
import { randomInt } from 'crypto';
import BlogPost from "../Schema/BlogPost";

/* let blogPosts: IBlogPost[] = [
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
] */


export const addPost = async (req: Request, res: Response) => {

     try {
          const { title, post } = req.body

          const blogPost = new BlogPost({
               title,
               post
          })

          const savedPost = await blogPost.save()
          res.json({
               message: `Blog post created`,
               status: 200,
               payload: savedPost
          })

     } catch (error) {
          res.status(500).json({
               error: error
          })
     }

}

export const getAll = async (req: Request, res: Response) => {
     try {
          const blogPost = await BlogPost.find()

          if (!blogPost) {
               return res.status(404).json({ errors: [{
                    message: 'Blog posts not found'
               }]})
          }
          res.json({
               message: "All Blog post successfully fetched",
               status: 200,
               payload: blogPost
          })
     } catch (error) {
          res.status(500).json({
               error: error
          })
     }
}

export const getById = async (req: Request, res: Response) => {

     try {
          const blogPost = await BlogPost.findById(req.params.id)

          if (!blogPost) {
               return res.status(404).json({ errors: [{
                    message: 'Blog post not found'
               }]})
          }
          res.json({
               message: `Blog post ${req.params.id} successfully fetched`,
               status: 200,
               payload: blogPost
          })

     } catch (error) {
          res.status(500).json({
               error: error
          })
     }

}

export const updatePost = async (req: Request, res: Response) => {
     try {
          const blogPost = await BlogPost.findById(req.params.id)

          if (!blogPost) {
               return res.status(404).json({
                    errors: [{ message: `Blog post ${req.params.id} was not found` }],
               })
          }

          const { title, post } = req.body
          blogPost.title = title
          blogPost.post = post

          const updatedPost = await blogPost.save()

          res.json({
               message: "Blog post updated",
               success: 200,
               payload: updatedPost,
          })

     } catch (error) {
          res.status(500).json({
               error: error
          })
     }
}



export const deletePost = async (req: Request, res: Response) => {
     
     try {
          const blogPost = await BlogPost.findByIdAndDelete(req.params.id)

          if (!blogPost) {
               return res.status(404).json({
                    errors: [{ message: `Blog post ${req.params.id} was not found` }],
               })
          }

          res.json({
               message: "Blog post deleted",
               success: 200,
          })



          
     } catch (error) {
          res.status(500).json({
               error: error
          })
     }

}


// COMMENTS

export const addComment = async (req: Request, res: Response) => {

     try {
          const blogPost = await BlogPost.findById(req.params.id)

          if (!blogPost) {
               return res.status(404).json({
                    errors: [{ message: `Blog post ${req.params.id} was not found` }],
               })
          }

          // add new comment to the blog post
          const comments = blogPost.comments
          const { comment } = req.body
          
          comments?.push(comment)

          const addedComment = await blogPost.save()

          res.send({
               message: 'Comment created',
               status: 200,
               payload: addedComment
          })     
     } catch (error) {
          res.status(500).json({
               error: error
          })
     }
     
     
} 


export const getAllComments = async (req: Request, res: Response) => {

     try {
          const blogPost = await BlogPost.findById(req.params.id)

          if (!blogPost) {
               return res.status(404).json({
                    errors: [{ message: `Blog post ${req.params.id} was not found` }],
               })
          }

          // Get all comments
          const comments = blogPost.comments

          res.send({
               message: 'All comments',
               status: 200,
               payload: comments
          })     
     } catch (error) {
          res.status(500).json({
               error: error
          })
     }
     
} 

export const getCommentsByID = async (req: Request, res: Response) => {
     try {
          const blogPost = await BlogPost.findById(req.params.id)

          if (!blogPost) {
               return res.status(404).json({
                    errors: [{ message: `Blog post ${req.params.id} was not found` }],
               })
          }

          // Get comment by id
          const comments = blogPost.comments

          const returnedComment = comments[Number(req.params.cid)]

          res.send({
               message: 'All comments',
               status: 200,
               payload: returnedComment
          })     

     } catch (error) {
          res.status(500).json({
               error: error
          })
     }
} 

export const updateComment = async (req: Request, res: Response) => {
     try {
          const blogPost = await BlogPost.findById(req.params.id)

          if (!blogPost) {
               return res.status(404).json({
                    errors: [{ message: `Blog post ${req.params.id} was not found` }],
               })
          }

          // update comment comment to the blog post
          const comments = blogPost.comments
          const { comment } = req.body
          
          comments[Number(req.params.cid)] = comment

          const updatedComment = await blogPost.save()

          res.send({
               message: 'Comment created',
               status: 200,
               payload: {
                    update: updatedComment
               }
          })     
     } catch (error) {
          res.status(500).json({
               error: error
          })
     }
     
} 

export const deleteComment = async (req: Request, res: Response) => {
     try {
          const blogPost = await BlogPost.findById(req.params.id)

          if (!blogPost) {
               return res.status(404).json({
                    errors: [{ message: `Blog post ${req.params.id} was not found` }],
               })
          }

          // delete comment comment to the blog post
          
          const newCommentList = blogPost.comments ? blogPost.comments.filter((i) => i !== ( blogPost.comments ? blogPost.comments[Number(req.params.cid)] : null)) : null
          blogPost.comments = newCommentList!

          const filteredComments = await blogPost.save()

          res.send({
               message: 'Comment deleted',
               status: 200,
               payload: {
                    filteredComments: filteredComments
               }
          })     
     } catch (error) {
          res.status(500).json({
               error: error
          })
     }
} 
 