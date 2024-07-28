import express from "express";
import { addPartner, getPartners } from "../Controllers/PartnerController.js";

export const partnerRouter = express.Router();

partnerRouter.post('/', addPartner)
partnerRouter.get('/', getPartners)