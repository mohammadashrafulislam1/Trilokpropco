import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addAmenities, getAmenities } from "../Controllers/AmenitiesController.js";

export const amenitiesRouter = express.Router();
// POST API Amenities:
amenitiesRouter.post('/', upload.single('logo'), addAmenities)

// GET API Amenities:
amenitiesRouter.get('/', getAmenities)
