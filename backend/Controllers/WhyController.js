import { WhyModel } from "../Models/WhyModel.js";
import { cloudinary } from "../utils/cloudinary.js";

export const addWhy = async (req, res) => {
    try {
        const logoResult = await cloudinary.uploader.upload(req.file.path);
        const whyData = {
            title: req.body.title,
            description: req.body.description,
            logo: logoResult.secure_url
        };
        const why = new WhyModel(whyData);
        const savedWhy = await why.save();
        res.status(200).json(savedWhy);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
};
