import { Schema, model } from "mongoose";
import IBlogPost from '../interfaces/IBlogPost';

export interface BlogPostDocument extends Document {
     title: string;
     post: string;
     comments: string[]
}

const blogPostSchema = new Schema<BlogPostDocument>(
     {
          title: {
               type: String,
               required: true
          },
          post: {
               type: String,
               required: true
          },
          comments: {
               type: Array(String),
               required: false
          }
     },
     {
          timestamps: true,
     }
)

export const BlogPosts = model<BlogPostDocument>("BlogPost", blogPostSchema)

export default BlogPosts
