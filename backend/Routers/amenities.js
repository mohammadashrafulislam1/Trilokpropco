import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addAmenities } from "../Controllers/AmenitiesController.js";

export const amenitiesRouter = express.Router();

amenitiesRouter.post('/', upload.single('logo'), addAmenities)
