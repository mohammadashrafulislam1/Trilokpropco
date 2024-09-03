import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from "../../Component/Navigation/Header";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { endPoint } from "../../Component/ForAll/ForAll";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const DetailProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const response = await fetch(`${endPoint}/property/${id}`);
      const propertyData = await response.json();
      setProperty(propertyData);
    };
    fetchProperty();
  }, [id]);

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <div>
      <Header isDefault={false} />

      {/* Custom Navigation Buttons */}
    <div
      style={{
        backgroundImage: `url(${property?.galleryImages?.[activeIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '600px',
      }}
    >
    <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full z-10 slide-btn"
      >
        <FaArrowLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full z-10 slide-btn"
      >
        <FaArrowRight size={20} />
      </button>

      <div className="flex flex-col justify-center align-middle items-center relative">
        <div className="lg:w-[80%] w-full relative mt-10">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={12}
            slidesPerView={3}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={setSwiperInstance}
          >
            {property?.galleryImages?.map((image, index) => (
              <SwiperSlide
                key={index}
                className={`flex items-center justify-center gap-5 ${
                  index === activeIndex ? "border-4 border-[#046307]" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover"
                  style={{
                    opacity: index === activeIndex ? 1 : 0.5,
                    transition: 'opacity 0.5s ease',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DetailProperty;
