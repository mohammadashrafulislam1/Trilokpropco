import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addCity, getCity } from "../Controllers/CityController.js";

export const cityRouter = express.Router();

// POST API Amenities:
cityRouter.post('/', upload.single('image'), addCity)

// GET API Amenities:
cityRouter.get('/', getCity)
