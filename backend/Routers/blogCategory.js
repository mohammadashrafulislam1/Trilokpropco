import express from "express";
import { addBlogCategory, getBlogCategories } from "../Controllers/blogCategory.js";

export const blogCategoryRouter = express.Router();

blogCategoryRouter.post('/', addBlogCategory)
blogCategoryRouter.get('/', getBlogCategories)
blogCategoryRouter.delete('/', deleteBlogCategory)