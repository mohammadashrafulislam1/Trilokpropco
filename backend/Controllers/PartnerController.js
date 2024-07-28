
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