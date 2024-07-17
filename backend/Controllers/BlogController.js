import { blogModel } from "../Models/BlogModel";
import { cloudinary } from "../utils/cloudinary";

export const addBlog = async(req, res)=>{
    try{
        const imageResult = await cloudinary.uploader.upload(req.file.path);
        const allFields= {
            category: req.body.category, 
            title: req.body.title, 
            description: req.body.description, image:imageResult.secure_url,
            date: req.body.date, 
            image:imageResult.secure_url
        }
        const blog = new blogModel(allFields)
        const savedBlog = await blog.save();
        res.status(200).json(savedBlog)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({message: "Internal Serval Error."})
    }
}