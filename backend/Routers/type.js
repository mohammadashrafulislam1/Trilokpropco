import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addType, deleteType, getTypes } from "../Controllers/TypesController.js";

export const typeRouter = express.Router();

// POST type api:
typeRouter.post('/', upload.single('logo'), addType)

// GET type api:
typeRouter.get('/', getTypes)

// delete type api:
typeRouter.delete('/:id', deleteType)