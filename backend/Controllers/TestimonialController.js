import { TestimonialModel } from "../Models/TestimonialModel";


export const addTestimonial = async(req, res) =>{
    try{
        const imageResult = await cloudinary.uploader.upload(req.file.path);
        const testimonial = new TestimonialModel({
            name: req.body.name, 
            des: req.body.des, 
            details: req.body.details, 
            rating: req.body.rating, 
            image:imageResult.secure_url})
        const savedTestimonial = await testimonial.save();
        res.status(200).json(savedTestimonial)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({message: "Internal Serval Error."})
    }
}

export const getTestimonial = async (req, res) =>{
    try{
      const testimonial = await TestimonialModel.find();
      res.status(200).json(testimonial)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}