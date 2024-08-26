import { useEffect, useState } from "react";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import { endPoint } from "../../../Component/ForAll/ForAll";
import BlogCard from "../../../Component/BlogCard/BlogCard";
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from 'swiper/modules';

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
     <Swiper
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    350: {
                        slidesPerView: 1,
                    },
                    430: {
                        slidesPerView: 1,
                    },
                    490: {
                        slidesPerView: 1,
                    },
                    550: {
                        slidesPerView: 1.5,
                    },
                    640: {
                        slidesPerView: 1.6,
                    },
                    700: {
                        slidesPerView: 2,
                    },
                    900: {
                        slidesPerView: 2.5,
                    },
                    1000: {
                        slidesPerView: 2.8,
                    },
                    1300: {
                        slidesPerView: 3,
                    },
                    1700: {
                        slidesPerView: 4.5,
                    },
                }}
                modules={[Pagination]}
                className="!flex !justify-center !gap-5 !mx-24 mt-10"
            >
     {
        blogs?.map(blog => 
            <SwiperSlide key={blog._id} className="mb-10 !mr-12 !w-[340px]"><BlogCard blog={blog}> </BlogCard>
            </SwiperSlide>)
     } 
          </Swiper>
    </div>
    );
};

export default LatestBlogs;