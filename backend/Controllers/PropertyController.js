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
        
        
        const propertyData = req.body;

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

// delete Property controller:
export const deleteProperty = async(req, res) =>{
    const id = req.params.id;
    try{
        const property = await PropertyModel.findById(id);
        if(!property){
            return res.status(404).json({ message: "Property not found."})
        }
        await PropertyModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Property successfully deleted."})
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});
    }
}