import express from "express";
import { addAbout, getAbout, updateAbout } from "../Controllers/AboutController.js";
import { upload } from "../MiddleWare/multer.js";
import { verifyToken } from "../MiddleWare/jwt.js";

export const aboutRouter = express.Router();

aboutRouter.post('/', verifyToken, upload.single('founderLogo'), addAbout);

aboutRouter.get('/', getAbout);

aboutRouter.put('/:id', verifyToken, upload.single('founderLogo'), updateAbout);