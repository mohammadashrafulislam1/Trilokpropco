import { useEffect, useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from 'swiper/modules';
import PropertyCard from "../../../Component/PropertyCard/PropertyCard";


const LatestProperties = () => {
    const [properties, setProperties] = useState([]);
    
  console.log(properties)
    // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${endPoint}/property`);
        const data = await response.json();

        const properties = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setProperties(properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

    return (
    <div className="mt-4 mb-10 lg:ml-24">
      <SectionTitle value= "our Latest properties "> </SectionTitle>    

      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          350: {
            slidesPerView: 1.6,
          },
          430: {
            slidesPerView: 1.8,
          },
          490: {
            slidesPerView: 2,
          },
          550: {
            slidesPerView: 2.2,
          },
          
          640: {
            slidesPerView: 2.6,
          },
          700:{
            slidesPerView:2.8,
          },
          900:{
            slidesPerView: 3.7,
          },
          1000:{
            slidesPerView:3.3,
          },
          1300: {
            slidesPerView: 3.5,
          },
          1700: {
            slidesPerView: 7.5,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
      {
        properties?.map( property =>
          <SwiperSlide key={property._id} className="mb-12">
            <PropertyCard property={property} />
          </SwiperSlide>
        )
      }
      </Swiper>  
    </div>
    );
};

export default LatestProperties;