import express from "express";
import { upload } from "../MiddleWare/multer.js"; // Assuming you are using multer for file uploads
import { addWhy, deleteWhy, getWhys, updateWhy } from "../Controllers/WhyController.js";

export const whyRouter = express.Router();

// Add a new Why entry
whyRouter.post('/', upload.single('logo'), addWhy);

// Get all Why entries
whyRouter.get('/', getWhys);

// Update a specific Why entry by ID
whyRouter.put('/:id', upload.single('logo'), updateWhy);

// Delete a specific Why entry by ID
whyRouter.delete('/:id', deleteWhy);
