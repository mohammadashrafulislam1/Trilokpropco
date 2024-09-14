import express from "express";
import { addPartner, deletePartner, getPartners } from "../Controllers/PartnerController.js";
import { verifyToken } from "../MiddleWare/jwt.js";

export const partnerRouter = express.Router();

partnerRouter.post('/', verifyToken, addPartner)
partnerRouter.get('/', getPartners)
partnerRouter.delete('/:id', verifyToken, deletePartner)