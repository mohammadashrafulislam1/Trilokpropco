import { AmenitiesModel } from "../Models/AmenitiesModel.js";
import { cloudinary } from "../utils/cloudinary.js";

// add Amenities controller:
export const addAmenities = async(req, res)=>{
    try{
        const imageResult = await cloudinary.uploader.upload(req.file.path);
        const amenities = new AmenitiesModel({
            name: req.body.name, 
            logo:imageResult.secure_url,
            imagePublicId: imageResult.public_id})
        const savedAmenities = await amenities.save();
        res.status(200).json(savedAmenities)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({message: "Internal Serval Error."})
    }
}
// get Amenities controller:
export const getAmenities = async (req, res) =>{
    try{
      const amenities = await AmenitiesModel.find();
      res.status(200).json(amenities)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}