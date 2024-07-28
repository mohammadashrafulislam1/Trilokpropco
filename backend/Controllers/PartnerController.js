import { PartnerModel } from "../Models/PartnerModel";
// add Partner controller:
export const addPartner = async(req, res) =>{
  try{
    const partner = new PartnerModel(req.body)
    const savedPartner = await partner.save();
    res.status(200).json(savedPartner)
  }
  catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
// get Partners controller:
export const getPartners = async (req, res) =>{
    try{
      const partners = await PartnerModel.find();
      res.status(200).json(partners)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}