import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addDeveloper } from "../Controllers/DeveloperController.js";

export const developerRouter = express.Router();

developerRouter.post('/', upload.single('image'), addDeveloper)
