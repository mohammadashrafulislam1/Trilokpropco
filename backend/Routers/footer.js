import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addFooter, getFooters, updateFooter } from "../Controllers/FooterController.js";

export const footerRouter = express.Router();

footerRouter.post('/', upload.single('image'), addFooter);

footerRouter.get('/', getFooters);

footerRouter.put('/:id', upload.single('image'), updateFooter);