import express from "express";
import { addBlogCategory, deleteBlogCategory, getBlogCategories } from "../Controllers/blogCategory.js";

export const blogCategoryRouter = express.Router();

blogCategoryRouter.post('/', addBlogCategory)
blogCategoryRouter.get('/', getBlogCategories)
blogCategoryRouter.delete('/:id', deleteBlogCategory)