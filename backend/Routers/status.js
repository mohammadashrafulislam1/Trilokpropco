import express from "express";
import { upload } from "../MiddleWare/multer";
import { addStatus } from "../Controllers/StatusController";

export const statusRouter = express.Router();

statusRouter('/', upload.single('image'), addStatus)
