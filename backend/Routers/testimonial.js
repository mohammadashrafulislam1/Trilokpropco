import express from "express";
import { addTestimonial } from "../Controllers/TestimonialController";

export const testimonialRouter = express.Router();

testimonialRouter.post('/', addTestimonial)