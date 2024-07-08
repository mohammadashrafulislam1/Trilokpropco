import { PropertyModel } from "../Models/PropertiesModel.js";
import { cloudinary } from "../utils/cloudinary.js";

export const addProperty = async (req, res) => {
    try {
        const { name } = req.body;
        const existingProject = await PropertyModel.findOne({ name });

        if (existingProject) {
            return res.status(400).json({ message: "Project already exists." });
        }

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