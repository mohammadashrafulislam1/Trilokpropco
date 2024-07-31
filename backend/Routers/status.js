import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addStatus, deleteStatus, getStatus } from "../Controllers/StatusController.js";

export const statusRouter = express.Router();

// POST status:
statusRouter.post('/', upload.single('image'), addStatus)

// GET status
statusRouter.get('/', getStatus)

// delete status
statusRouter.delete('/:id', deleteStatus)
