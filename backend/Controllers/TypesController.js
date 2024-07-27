import { TypesModel } from "../Models/TypesModel.js";
import { cloudinary } from "../utils/cloudinary.js";

// add Types controller:
export const addType = async(req, res)=>{
    try{
        const { name } = req.body;
        const existingProject = await TypesModel.findOne({ name });

        if (existingProject) {
            return res.status(400).json({ message: "Type already exists." });
        }
        const imageResult = await cloudinary.uploader.upload(req.file.path);
        const type = new TypesModel({
            type: req.body.type, 
            logo:imageResult.secure_url,
            imagePublicId: imageResult.public_id})
        const savedType = await type.save();
        res.status(200).json(savedType)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({message: "Internal Serval Error."})
    }
}

// get Types controller:
export const getTypes = async (req, res) =>{
    try{
      const types = await TypesModel.find();
      res.status(200).json(types)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}