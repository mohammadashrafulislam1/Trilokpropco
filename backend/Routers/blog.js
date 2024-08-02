import express from 'express';
import { addBlog, deleteBlog, getBlogs, getSingleBlog, updateBlog } from '../Controllers/BlogController.js';
import { upload } from '../MiddleWare/multer.js';

export const blogRouter = express.Router();

blogRouter.post('/', upload.single('image'), addBlog)
blogRouter.get('/', getBlogs)
blogRouter.get('/:id', getSingleBlog)
blogRouter.get('/:id', updateBlog)
blogRouter.delete('/:id', deleteBlog)
