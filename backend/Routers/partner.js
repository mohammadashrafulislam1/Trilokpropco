import express from "express";
import { addPartner } from "../Controllers/PartnerController";

export const partnerRouter = express.Router();

partnerRouter.post('/', addPartner)