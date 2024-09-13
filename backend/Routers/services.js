import express from "express";
import { upload } from "../MiddleWare/multer.js"; // Assuming you are using multer for file uploads
import { addService, deleteService, getServices, updateService } from "../Controllers/ServicesController.js";

export const servicesRouter = express.Router();

// Add a new Service
servicesRouter.post('/', upload.single('logo'), addService);

// Get all Services
servicesRouter.get('/', getServices);

// Update a specific Service by ID
servicesRouter.put('/:id', upload.single('logo'), updateService);

// Delete a specific Service by ID
servicesRouter.delete('/:id', deleteService);
