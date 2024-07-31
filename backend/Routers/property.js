import express from "express";
import { addProperty, deleteProperty, getProperty, updateProperty } from "../Controllers/PropertyController.js";

export const propertyRouter = express.Router();


// POST Property:
propertyRouter.post('/', addProperty);
// GET Property:
propertyRouter.get('/', getProperty)
// update Property:
propertyRouter.put('/:id', updateProperty)
// delete Property:
propertyRouter.delete('/:id', deleteProperty)