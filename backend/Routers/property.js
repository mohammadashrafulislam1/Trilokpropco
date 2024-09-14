import express from "express";
import { addProperty, deleteProperty, getProperty, updateProperty, deleteGalleryImage, getSingleProperty, deleteBankImage, searchProperty } from "../Controllers/PropertyController.js";
import { verifyAdmin, verifyEditor } from "../MiddleWare/jwt.js";

export const propertyRouter = express.Router();


// Search Property (this should have a different route to avoid conflict)
propertyRouter.get('/search', searchProperty);

// POST Property:
propertyRouter.post('/', verifyEditor, verifyAdmin, addProperty);
// GET Property:
propertyRouter.get('/', getProperty)
// GET sing Property:
propertyRouter.get('/:id', getSingleProperty)
// update Property:
propertyRouter.put('/:id', verifyEditor, verifyAdmin, updateProperty)
// delete Property:
propertyRouter.delete('/:id', verifyAdmin, deleteProperty)
// delete Gallery Image:
propertyRouter.delete('/:id/galleryImage', verifyAdmin, deleteGalleryImage)
// delete Bank Image:
propertyRouter.delete('/:id/bankImage', verifyAdmin, deleteBankImage)
