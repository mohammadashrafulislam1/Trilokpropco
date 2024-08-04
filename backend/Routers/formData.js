import express from "express";
import { addFormData } from "../Controllers/FormDataController";

export const formRouter = express.Router();

formRouter.post('/', addFormData)
