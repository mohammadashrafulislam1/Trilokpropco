import { StatusModel } from "../Models/StatusModel";
import { cloudinary } from "../utils/cloudinary";

export const addStatus = async(req, res)=>{
    try{
        const imageResult = await cloudinary.uploader.upload(req.file.path);
        const status = new StatusModel({status: req.body.status, image:imageResult.secure_url})
        const savedStatus = await status.save();
        res.status(200).json(savedStatus)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({message: "Internal Serval Error."})
    }
}