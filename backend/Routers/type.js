import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addType, deleteType, getTypes } from "../Controllers/TypesController.js";
import { verifyToken } from "../MiddleWare/jwt.js";

export const typeRouter = express.Router();

// POST type api:
typeRouter.post('/', verifyToken, upload.single('logo'), addType)

// GET type api:
typeRouter.get('/', getTypes)

// delete type api:
typeRouter.delete('/:id', verifyToken, deleteType)