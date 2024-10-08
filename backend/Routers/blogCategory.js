import express from "express";
import { addBlogCategory, deleteBlogCategory, getBlogCategories } from "../Controllers/blogCategory.js";
import { verifyAdmin, verifyEditor } from "../MiddleWare/jwt.js";

export const blogCategoryRouter = express.Router();

blogCategoryRouter.post('/', verifyEditor, verifyAdmin, addBlogCategory)
blogCategoryRouter.get('/', getBlogCategories)
blogCategoryRouter.delete('/:id', verifyEditor, verifyAdmin, deleteBlogCategory)