import express from "express";
import { addAbout, getAbout, updateAbout } from "../Controllers/AboutController.js";
import { upload } from "../MiddleWare/multer.js";

export const aboutRouter = express.Router();

aboutRouter.post('/', upload.single('founderLogo'), addAbout);

aboutRouter.get('/', getAbout);

aboutRouter.put('/:id', upload.single('founderLogo'), updateAbout);