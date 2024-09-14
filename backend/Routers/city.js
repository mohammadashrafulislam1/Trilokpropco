import express from "express";
import { upload } from "../MiddleWare/multer.js";
import { addCity, deleteCity, getCity } from "../Controllers/CityController.js";
import { verifyAdmin, verifyEditor } from "../MiddleWare/jwt.js";

export const cityRouter = express.Router();

// POST API City:
cityRouter.post('/', verifyEditor, verifyAdmin, upload.single('image'), addCity)

// GET API City:
cityRouter.get('/', verifyAdmin, getCity)

// delete API City:
cityRouter.delete('/:id', verifyEditor, verifyAdmin, deleteCity)


