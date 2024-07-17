import express from 'express';
import { addBlog, getBlogs } from '../Controllers/BlogController.js';
import { upload } from '../MiddleWare/multer.js';

export const blogRouter = express.Router();

blogRouter.post('/', upload.single('image'), addBlog)
blogRouter.get('/', getBlogs)
