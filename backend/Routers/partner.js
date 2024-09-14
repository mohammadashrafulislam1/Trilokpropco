import express from "express";
import { addPartner, deletePartner, getPartners } from "../Controllers/PartnerController.js";
import { verifyAdmin } from "../MiddleWare/jwt.js";

export const partnerRouter = express.Router();

partnerRouter.post('/', verifyAdmin, addPartner)
partnerRouter.get('/', getPartners)
partnerRouter.delete('/:id', verifyAdmin, deletePartner)