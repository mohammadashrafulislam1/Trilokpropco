import { DeveloperModel } from "../Models/DeveloperModel.js";
import { cloudinary } from "../utils/cloudinary.js";

export const addDeveloper = async(req, res)=>{
    try{
        const imageResult = await cloudinary.uploader.upload(req.file.path);
        const developer = new DeveloperModel({name: req.body.name, details: req.body.details, image:imageResult.secure_url})
        const savedDeveloper = await developer.save();
        res.status(200).json(savedDeveloper)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({message: "Internal Serval Error."})
    }
}

export const getDeveloper = async (req, res) =>{
    try{
      const developers = await DeveloperModel.find();
      res.status(200).json(developers)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}