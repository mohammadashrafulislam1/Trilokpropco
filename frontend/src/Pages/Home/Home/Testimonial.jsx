import { useEffect } from "react";
import { useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import TestimonialCard from "../../../Component/ForAll/TestimonialCard";

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState();
    useEffect(()=>{
     const fetchTestimonial = async() =>{
        try {
            const response = await fetch(`${endPoint}/testimonial`);
            const data = await response.json();
                setTestimonials(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
     }
     fetchTestimonial()
    },[])
    return (
    <div className="my-24 mx-10">
       <SectionTitle value="What Our Client Says" />

       <div className="flex gap-3 mx-auto ">
       {
        testimonials?.map(testimonial =>
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
        )
       } </div>  
    </div>
    );
};

export default Testimonial;