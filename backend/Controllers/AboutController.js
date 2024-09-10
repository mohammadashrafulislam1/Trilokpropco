import { AboutModel } from "../Models/AboutMode.js";
import { cloudinary } from "../utils/cloudinary.js";

export const addAbout = async (req, res) => {
    try {
        const imageResult = await cloudinary.uploader.upload(req.file.path);
        const aboutData = {
            history: req.body.history,
            mission: req.body.mission,
            vision: req.body.vision,
            founder: req.body.founder,
            founderLogo: req.body.founderLogo,
            locationMap: req.body.locationMap,
            imagePublicId: imageResult.public_id,
        };
        const about = new AboutModel(aboutData);
        const savedAbout = await about.save();
        res.status(200).json(savedAbout);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

export const updateAbout = async (req, res) => {
    try {
        const { id } = req.params;
        const existingAbout = await AboutModel.findById(id);
        if (!existingAbout) {
            return res.status(404).json({ message: "About section not found" });
        }

        const updatedData = {
            history: req.body.history || existingAbout.history,
            mission: req.body.mission || existingAbout.mission,
            vision: req.body.vision || existingAbout.vision,
            founder: req.body.founder || existingAbout.founder,
            founderLogo: req.body.founderLogo || existingAbout.founderLogo,
            locationMap: req.body.locationMap || existingAbout.locationMap,
        };

        if (req.file) {
            // Delete the old image from cloudinary
            await cloudinary.uploader.destroy(existingAbout.imagePublicId);
            
            // Upload the new image
            const imageResult = await cloudinary.uploader.upload(req.file.path);
            updatedData.imagePublicId = imageResult.public_id;
        } else {
            updatedData.imagePublicId = existingAbout.imagePublicId;
        }

        const updatedAbout = await AboutModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(updatedAbout);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
};