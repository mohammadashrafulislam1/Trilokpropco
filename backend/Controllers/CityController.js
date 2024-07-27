
import { CityModel } from "../Models/CityModel.js";
import { cloudinary } from "../utils/cloudinary.js";

// add Amenities controller:
export const addCity = async(req, res)=>{
    try{
        const imageResult = await cloudinary.uploader.upload(req.file.path);
        const city = new CityModel({name: req.body.name, image:imageResult.secure_url,
            imagePublicId: imageResult.public_id})
        const savedCity = await city.save();
        res.status(200).json(savedCity)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({message: "Internal Serval Error."})
    }
}
// get Amenities controller:
export const getCity = async (req, res) =>{
    try{
      const city = await CityModel.find();
      res.status(200).json(city)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}