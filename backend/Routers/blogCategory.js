import express from "express";
import { addBlogCategory } from "../Controllers/blogCategory";

export const blogCategoryRouter = express.Router();

blogCategoryRouter.post('/', addBlogCategory)