import express from "express";
import { addPartner, deletePartner, getPartners } from "../Controllers/PartnerController.js";

export const partnerRouter = express.Router();

partnerRouter.post('/', addPartner)
partnerRouter.get('/', getPartners)
partnerRouter.delete('/:id', deletePartner)