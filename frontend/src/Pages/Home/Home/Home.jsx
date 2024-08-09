import { useEffect, useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";
import { Swiper, SwiperSlide } from "swiper/react"; 
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import PropertyItem from "./PropertyItem";
import { Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import Header from "../../../Component/Navigation/Header";

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const [activeItem, setActiveItem] = useState({});

  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${endPoint}/property`);
        const data = await response.json();
        
        // Filter properties where isFeatured is true
        let featuredProperties = data.filter(property => property.isFeatured);
        
        // Sort the featured properties by created_at date in descending order
        featuredProperties = featuredProperties.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        setProperties(featuredProperties);

        // Set the first featured property as the active item
        if (featuredProperties.length > 0) {
          setActiveItem(featuredProperties[0]);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  // Update active item when slideIndex changes
  useEffect(() => {
    if (properties.length > 0) {
      setActiveItem(properties[slideIndex]);
    }
  }, [slideIndex, properties]);

  // For change slider
  const onClickHandler = (swiper) => {
    if (swiper.clickedSlide) {
      if (swiper.clickedSlide.attributes) {
        const a = swiper.clickedSlide.attributes.getNamedItem('data-swiper-slide-index').value;
        setSlideIndex(a);
      }
    }
  };

  return (
    <div
      className="mx-auto pt-5 px-4 "
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${activeItem?.galleryImages?.[0]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height:'700px'
      }}
    >
      <Header />
      <div className="flex flex-col lg:flex-row justify-center align-middle items-center gap-5">
        <div className="lg:w-1/3 mb-8 lg:mb-0 lg:ml-16">
          <div className="bg-transparent px-0">
            <h1 className="font-bold text-3xl text-white">{activeItem?.name}</h1>
            <p 
              className="mt-4 text-white" 
              dangerouslySetInnerHTML={{ __html: activeItem?.description?.slice(0, 180) }}
            />
            <button className="px-4 py-2 mt-4 bg-yellow-500 text-white rounded">
              View
            </button>
          </div>
        </div>
        <div className="lg:w-2/3">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]} 
            spaceBetween={12}
            slidesPerView={3}
            navigation
            loop={true}
            onClick={(swiper) => onClickHandler(swiper)}
            onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
            
          >
            {properties?.map((property, index) => (
              <SwiperSlide key={property.id} className="flex items-center justify-center">
                {({ isActive }) => <PropertyItem isActive={isActive} property={property} />}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
