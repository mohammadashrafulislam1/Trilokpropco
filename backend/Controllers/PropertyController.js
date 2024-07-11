import { PropertyModel } from "../Models/PropertiesModel.js";
import { cloudinary } from "../utils/cloudinary.js";

// post property controller:
export const addProperty = async (req, res) => {
    try {
        const { name } = req.body;
        const existingProject = await PropertyModel.findOne({ name });

        if (existingProject) {
            return res.status(400).json({ message: "Project already exists." });
        }
      console.log(req.files, req.file, req.body.galleryImages)
        const galleryImages = await Promise.all(
            req.files.map(async file => {
                const result = await cloudinary.uploader.upload(file.path);
                return result.secure_url;
            })
        );
        
        const propertyData = {
            ...req.body,
            galleryImages,
            // location, video, and pdfDownload are expected to be provided directly from the frontend
        };

        const property = new PropertyModel(propertyData);
        const savedProperty = await property.save();
        res.status(200).json(savedProperty);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

// get properties controller:
export const getProperty = async (req, res) =>{
    try{
      const propeties = await PropertyModel.find();
      res.status(200).json(propeties)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}