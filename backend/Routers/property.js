import express from "express";
import { addProperty, deleteProperty, getProperty, updateProperty, deleteGalleryImage, getSingleProperty, deleteBankImage, searchProperty } from "../Controllers/PropertyController.js";

export const propertyRouter = express.Router();


// POST Property:
propertyRouter.post('/', addProperty);
// GET Property:
propertyRouter.get('/', getProperty)
// GET sing Property:
propertyRouter.get('/:id', getSingleProperty)
// update Property:
propertyRouter.put('/:id', updateProperty)
// delete Property:
propertyRouter.delete('/:id', deleteProperty)
// delete Gallery Image:
propertyRouter.delete('/:id/galleryImage', deleteGalleryImage)
// delete Bank Image:
propertyRouter.delete('/:id/bankImage', deleteBankImage)

propertyRouter.get('/', searchProperty)
