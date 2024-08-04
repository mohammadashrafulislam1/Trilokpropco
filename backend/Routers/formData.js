import express from "express";
import { addFormData, deleteFormData, getFormData } from "../Controllers/FormDataController.js";

export const formRouter = express.Router();

formRouter.post('/', addFormData)
formRouter.get('/', getFormData)
formRouter.delete('/:id', deleteFormData)
