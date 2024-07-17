import express from "express";
import { addBlogCategory, getBlogCategories } from "../Controllers/blogCategory";

export const blogCategoryRouter = express.Router();

blogCategoryRouter.post('/', addBlogCategory)
blogCategoryRouter.get('/', getBlogCategories)