import { useEffect, useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PropertyItem from "./PropertyItem";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Header from "../../../Component/Navigation/Header";

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${endPoint}/property`);
        const data = await response.json();

        let featuredProperties = data.filter(property => property.isFeatured);

        featuredProperties = featuredProperties.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setProperties(featuredProperties);

        if (featuredProperties.length > 0) {
          setActiveItem(featuredProperties[0]);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    if (properties.length > 0) {
      setActiveItem(properties[slideIndex]);
    }
  }, [slideIndex, properties]);

  const onClickHandler = (index) => {
    if (swiperInstance && index !== slideIndex) {
      setSlideIndex(index);
      swiperInstance.slideToLoop(index);
    }
  };

  // Handler for custom navigation buttons
  const handlePrev = () => {
    console.log("Previous button clicked");
    if (swiperInstance) {
      console.log("Swiper instance:", swiperInstance);
      swiperInstance.slidePrev();
    }
  };

  const handleNext = () => {
    console.log("Next button clicked");
    if (swiperInstance) {
      console.log("Swiper instance:", swiperInstance);
      swiperInstance.slideNext();
    }
  };

  // Determine if buttons should be shown
  const shouldShowButtons = properties.length > 0;

  return (
    <div
      className="pt-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${activeItem?.galleryImages?.[0]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '900px'
      }}
    >
      <Header />
      
      <div className="flex flex-col lg:flex-row justify-center align-middle items-center gap-14 relative">
        {/* Custom Navigation Buttons */}
        {shouldShowButtons && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            >
              &gt;
            </button>
          </>
        )}

        <div className="lg:w-[40%] mb-8 lg:mb-0 lg:ml-16">
          <div className="bg-transparent px-0">
            <h1 className="Bebas-Neue text-7xl text-white"
            style={{
              letterSpacing:'3px',
              textTransform:'uppercase'
            }}>{activeItem?.name}</h1>
            <p
              className="mt-3 !text-white font-extralight"
              dangerouslySetInnerHTML={{ __html: activeItem?.description?.slice(0, 180) }}
            />
            <p className="font-semibold text-white mt-2">Price: <span className="!text-white font-extralight"> {activeItem?.priceRange}</span></p>
            <p className="font-semibold text-white">Unit Size: <span className="!text-white font-extralight">{activeItem?.size}</span></p>
            <p className="font-semibold text-white">Config: <span className="!text-white font-extralight">{activeItem?.configuration}</span></p>
            <button className="px-4 py-2 mt-4 bg-yellow-500 text-white rounded">
              View
            </button>
          </div>
        </div>

        <div className="lg:w-[60%] relative">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={12}
            slidesPerView={2.8}
            loop={shouldShowButtons} // Enable loop only if there are more than 1 slide
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
              console.log("Swiper instance:", swiper); // Debugging log
            }}
            onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
          >
            {properties.map((property, index) => (
              <SwiperSlide
                key={`${property.id}-${index}`}
                className="flex items-center justify-center gap-5"
                onClick={() => onClickHandler(index)}
              >
                {({ isActive }) => (
                  <PropertyItem isActive={isActive} property={property} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
