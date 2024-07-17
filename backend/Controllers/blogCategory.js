import { blogModel } from "../Models/BlogModel";

export const addBlogCategory = async()=>{
    try{
        const blogCategory = new blogModel({category: req.body.category})
        const savedBlogCategory = await blogCategory.save();
        res.status(200).json(savedBlogCategory)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({message: "Internal Serval Error."})
    }
}