import { TypesModel } from "../Models/TypesModel.js";
import { cloudinary } from "../utils/cloudinary.js";

export const addType = async(req, res)=>{
    try{
        const imageResult = await cloudinary.uploader.upload(req.file.path);
        const type = new TypesModel({type: req.body.type, logo:imageResult.secure_url})
        const savedType = await type.save();
        res.status(200).json(savedType)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({message: "Internal Serval Error."})
    }
}

export const getTypes = async (req, res) =>{
    try{
      const types = await TypesModel.find();
      res.status(200).json(types)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}