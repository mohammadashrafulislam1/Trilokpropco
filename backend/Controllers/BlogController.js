import { blogModel } from "../Models/BlogModel.js";
import { cloudinary } from "../utils/cloudinary.js";

// add Blog controller:
export const addBlog = async(req, res)=>{
    try{
        const imageResult = await cloudinary.uploader.upload(req.file.path);
        const allFields= {
            category: req.body.category, 
            title: req.body.title, 
            description: req.body.description, image:imageResult.secure_url,
            date: req.body.date, 
            image:imageResult.secure_url,
            imagePublicId: imageResult.public_id
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
// get Blogs controller:
export const getBlogs  = async (req, res) =>{
    try{
      const blogs = await blogModel.find();
      res.status(200).json(blogs)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});
    }
}

// get Single Blog controller:
export const getSingleBlog = async (req, res) =>{
    const id = req.params.id;
    try{
      const blog= await blogModel.findById(id);
      if(!blog){
        return res.status(404).json({message: "blog not found."})
      }
      res.status(200).json(blog)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}
// update Blog
export const updateBlog = async (req, res) => {
    const id =req.params.id;
    const blogData = req.body;
    try{
    const blog = await blogModel.findById(id);
    if (!blog) {
        return res.status(400).json({ message: "Blog not found." });
    }
    console.log(blogData)
    const updatedBlog = await blogModel.findByIdAndUpdate(id, blogData, {new: true});
    res.status(200).json(updatedBlog);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
}


// delete blog controller:
export const deleteBlog = async(req, res) =>{
    const id = req.params.id;
    console.log("Deleting blog with ID:", id); // Add this line
    try{
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(404).json({ message: "Blog not found."})
        }
        await blogModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog successfully deleted."})
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});
    }
}