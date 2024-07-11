import express from "express";
import { addProperty, getProperty } from "../Controllers/PropertyController.js";
import { upload } from "../MiddleWare/multer.js";

export const propertyRouter = express.Router();

// POST Property:
propertyRouter.post('/', upload.array('galleryImages', 10), addProperty);
// GET Property:
propertyRouter.get('/', getProperty)