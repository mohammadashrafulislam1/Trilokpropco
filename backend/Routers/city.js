import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addCity, deleteCity, getCity } from "../Controllers/CityController.js";
import { verifyToken } from "../MiddleWare/jwt.js";

export const cityRouter = express.Router();

// POST API City:
cityRouter.post('/', verifyToken, upload.single('image'), addCity)

// GET API City:
cityRouter.get('/', getCity)

// delete API City:
cityRouter.delete('/:id', verifyToken, deleteCity)


