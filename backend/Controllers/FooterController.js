import { FooterModel } from "../Models/FooterModel";
import { cloudinary } from "../utils/cloudinary";

// add Footer controller:
// Add Footer controller
export const addFooter = async (req, res) => {
    try {
      const imageResult = await cloudinary.uploader.upload(req.file.path);
      const footerData = {
        description: req.body.description,
        image: imageResult.secure_url, // Correctly accessing secure_url from imageResult
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        youtube: req.body.youtube,
        linkedin: req.body.linkedin,
        whatsapp: req.body.whatsapp,
        twitter: req.body.twitter,
        email: req.body.email,
        contact: req.body.contact,
        location: req.body.location,
      };
      const footer = new FooterModel(footerData);
      const savedFooter = await footer.save();
      res.status(200).json(savedFooter);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Internal Server Error." });
    }
  };
// get Footers controller:
export const getFooters = async (req, res) =>{
    try{
      const footers = await FooterModel.find();
      res.status(200).json(footers)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}

// Update Footer controller
export const updateFooter = async (req, res) => {
    try {
      const { id } = req.params; 
      const updatedFooter = await FooterModel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedFooter);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Internal Server Error." });
    }
  };