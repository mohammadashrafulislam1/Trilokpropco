import { categoryModel } from "../Models/BlogCategoryModel";

// add blog category
export const addBlogCategory = async()=>{
    try{
        const blogCategory = new categoryModel({category: req.body.category})
        const savedBlogCategory = await blogCategory.save();
        res.status(200).json(savedBlogCategory)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({message: "Internal Serval Error."})
    }
}

// get blog categories
export const getBlogCategories = async (req, res) =>{
    try{
      const categories = await categoryModel.find();
      res.status(200).json(categories)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}