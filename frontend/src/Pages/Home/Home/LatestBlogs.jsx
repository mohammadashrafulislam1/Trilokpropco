import { useEffect, useState } from "react";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import { endPoint } from "../../../Component/ForAll/ForAll";
import BlogCard from "../../../Component/BlogCard/BlogCard";

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState(null)
    console.log(blogs)
    useEffect(()=>{
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${endPoint}/blog`);
                const data = await response.json();

                // Sort by date and limit to the first 8 properties
                const sortedProperties = data
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 8);

                    setBlogs(sortedProperties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchBlogs();
    }, [

    ])
    return (
    <div>
     <SectionTitle value="Latest Blogs & Posts" /> 
     {
        blogs?.map(blog => <BlogCard key={blog._id} blog={blog}> </BlogCard>)
     }      
    </div>
    );
};

export default LatestBlogs;