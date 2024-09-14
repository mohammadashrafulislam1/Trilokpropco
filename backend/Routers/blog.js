import express from 'express';
import { addBlog, deleteBlog, getBlogs, getSingleBlog, updateBlog } from '../Controllers/BlogController.js';
import { upload } from '../MiddleWare/multer.js';
import { verifyToken } from '../MiddleWare/jwt.js';

export const blogRouter = express.Router();

blogRouter.post('/', verifyToken, upload.single('image'), addBlog)
blogRouter.get('/', getBlogs)
blogRouter.get('/:id', getSingleBlog)
blogRouter.put('/:id', verifyToken, upload.single('image'), updateBlog)
blogRouter.delete('/:id', verifyToken, deleteBlog)
