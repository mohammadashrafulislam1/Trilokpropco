import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addStatus } from "../Controllers/StatusController.js";

export const statusRouter = express.Router();

statusRouter.post('/', upload.single('image'), addStatus)
