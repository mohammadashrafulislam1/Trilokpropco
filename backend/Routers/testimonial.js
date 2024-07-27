import express from "express";
import { addTestimonial, getTestimonial } from "../Controllers/TestimonialController";
import { upload } from "../MiddleWare/multer";

export const testimonialRouter = express.Router();

// POST Testimonial API:
testimonialRouter.post('/', upload.single('image'), addTestimonial)

// GET Testimonial API:
developerRouter.get('/', getTestimonial)