import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({ 
    name:{ type: String, required: true },
    Images: { type: [String], required: true },
 })

export const PartnerModel = mongoose.model('partners', partnerSchema);
