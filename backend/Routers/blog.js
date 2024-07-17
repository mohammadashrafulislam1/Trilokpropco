import express from 'express';
import { addBlog } from '../Controllers/BlogController';
import { upload } from '../MiddleWare/multer';

export const blogRouter = express.Router();

blogRouter.post('/', upload.single('image'), addBlog)
