import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addFooter, getFooters, updateFooter } from "../Controllers/FooterController.js";
import { verifyToken } from "../MiddleWare/jwt.js";

export const footerRouter = express.Router();

footerRouter.post('/', verifyToken, upload.single('image'), addFooter);

footerRouter.get('/', getFooters);

footerRouter.put('/:id', verifyToken, upload.single('image'), updateFooter);