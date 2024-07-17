import express from "express";
import { addProperty, getProperty } from "../Controllers/PropertyController.js";

export const propertyRouter = express.Router();

// POST Property:
propertyRouter.post('/', addProperty);
// GET Property:
propertyRouter.get('/', getProperty)