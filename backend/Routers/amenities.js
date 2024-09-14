import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addAmenities, deleteAmenity, getAmenities } from "../Controllers/AmenitiesController.js";
import { verifyAdmin, verifyEditor } from "../MiddleWare/jwt.js";

export const amenitiesRouter = express.Router();
// POST API Amenities:
amenitiesRouter.post('/', verifyEditor, verifyAdmin, upload.single('logo'), addAmenities)

// GET API Amenities:
amenitiesRouter.get('/', getAmenities)

// Delete API Amenities:
amenitiesRouter.delete('/:id', verifyEditor, verifyAdmin, deleteAmenity)
