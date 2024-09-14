import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addStatus, deleteStatus, getStatus } from "../Controllers/StatusController.js";
import { verifyToken } from "../MiddleWare/jwt.js";

export const statusRouter = express.Router();

// POST status:
statusRouter.post('/', verifyToken, upload.single('image'), addStatus)

// GET status
statusRouter.get('/', getStatus)

// delete status
statusRouter.delete('/:id', verifyToken, deleteStatus)
