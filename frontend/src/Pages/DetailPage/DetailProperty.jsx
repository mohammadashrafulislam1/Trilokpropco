import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from "../../Component/Navigation/Header";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { endPoint } from "../../Component/ForAll/ForAll";
import { FaAngleLeft, FaAngleRight, FaRegHeart} from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";

const DetailProperty = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [developer, setDeveloper] = useState({});
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const response = await fetch(`${endPoint}/property/${id}`);
      const propertyData = await response.json();
      setProperty(propertyData);

      if (propertyData.developer) {
        const developerResponse = await fetch(`${endPoint}/developer`);
        const developerData = await developerResponse.json();
        const foundDeveloper = developerData.find(d => d._id === propertyData.developer);
        setDeveloper(foundDeveloper);
      }
    };
    fetchProperty();

    
  }, [id, property]);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(activeIndex);
    }
  }, [activeIndex, swiperInstance]);

  const handlePrev = () => {
    if (swiperInstance) {
      const newIndex = activeIndex - 1;
      if (newIndex >= 0) {
        setActiveIndex(newIndex);
        swiperInstance.slideTo(newIndex);
      }
    }
  };

  const handleNext = () => {
    if (swiperInstance) {
      const newIndex = activeIndex + 1;
      if (newIndex < (property?.galleryImages?.length || 0)) {
        setActiveIndex(newIndex);
        swiperInstance.slideTo(newIndex);
      }
    }
  };

  const handleSlideClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
      setActiveIndex(index);
    }
  };

  return (
    <div className="mb-20 overflow-hidden">
      <Header isDefault={false} />

      {/* Custom Navigation Buttons and slider */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${property?.galleryImages?.[activeIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '670px',
          position: 'relative',
        }}
      >
        <div className="flex">
          <div className="flex gap-2 text-[#ffffff77] text-4xl">
          <IoShareSocial />
            <FaRegHeart />
          </div>
          <img src={developer.image} alt={developer.name} className="w-[70px] h-[70px] rounded-full opacity-10"/>

        </div>
        <button
          onClick={handlePrev}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-[#ffffff69] text-gray-800 p-3 rounded-full z-10"
          aria-label="Previous slide"
        >
          <FaAngleLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-[#ffffff69] text-gray-800 p-3 rounded-full z-10"
          aria-label="Next slide"
        >
          <FaAngleRight size={20} />
        </button>

        <div className="absolute bottom-12 !right-[-500px]">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={12}
            slidesPerView={3.2}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            onSwiper={setSwiperInstance}
            className="swiper-container"
          >
            {property?.galleryImages?.map((image, index) => (
              <SwiperSlide
                key={index}
                onClick={() => handleSlideClick(index)}
                className={`!w-[160px] !h-[100px] flex items-center justify-center gap-5 cursor-pointer ${
                  index === activeIndex
                    ? "border-[3px] border-[#046307] rounded-[10px] !h-[103px]"
                    : "rounded-[10px]"
                }`}
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover rounded-[10px]"
                  style={{
                    opacity: index === activeIndex ? 1 : 0.9,
                    transition: "opacity 0.5s ease",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>


    </div>
  );
};

export default DetailProperty;
