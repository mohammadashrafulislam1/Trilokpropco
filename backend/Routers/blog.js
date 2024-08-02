import express from 'express';
import { addBlog, deleteBlog, getBlogs, getSingleBlog } from '../Controllers/BlogController.js';
import { upload } from '../MiddleWare/multer.js';

export const blogRouter = express.Router();

blogRouter.post('/', upload.single('image'), addBlog)
blogRouter.get('/', getBlogs)
blogRouter.get('/:id', getSingleBlog)
blogRouter.delete('/:id', deleteBlog)
