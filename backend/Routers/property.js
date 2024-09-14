import express from "express";
import { addProperty, deleteProperty, getProperty, updateProperty, deleteGalleryImage, getSingleProperty, deleteBankImage, searchProperty } from "../Controllers/PropertyController.js";
import { verifyToken } from "../MiddleWare/jwt.js";

export const propertyRouter = express.Router();


// Search Property (this should have a different route to avoid conflict)
propertyRouter.get('/search', searchProperty);

// POST Property:
propertyRouter.post('/', verifyToken, addProperty);
// GET Property:
propertyRouter.get('/', getProperty)
// GET sing Property:
propertyRouter.get('/:id', getSingleProperty)
// update Property:
propertyRouter.put('/:id', verifyToken, updateProperty)
// delete Property:
propertyRouter.delete('/:id', verifyToken, deleteProperty)
// delete Gallery Image:
propertyRouter.delete('/:id/galleryImage', verifyToken, deleteGalleryImage)
// delete Bank Image:
propertyRouter.delete('/:id/bankImage', verifyToken, deleteBankImage)
