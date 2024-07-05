import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addType } from "../Controllers/TypesController.js";

export const typeRouter = express.Router();

typeRouter.post('/', upload.single('logo'), addType)
