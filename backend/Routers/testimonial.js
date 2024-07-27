import express from "express";
import { addTestimonial, deleteTestimonial, getTestimonial } from "../Controllers/TestimonialController.js";
import { upload } from "../MiddleWare/multer.js";

export const testimonialRouter = express.Router();

// POST Testimonial API:
testimonialRouter.post('/', upload.single('image'), addTestimonial)

// GET Testimonial API:
testimonialRouter.get('/', getTestimonial)

// DELETE Testimonial API:
testimonialRouter.delete('/:id', deleteTestimonial)