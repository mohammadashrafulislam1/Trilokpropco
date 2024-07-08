import express from "express";
import { addProperty } from "../Controllers/PropertyController.js";
import { upload } from "../MiddleWare/multer.js";

export const propertyRouter = express.Router();

propertyRouter.post('/', upload.array('galleryImages', 10), addProperty);