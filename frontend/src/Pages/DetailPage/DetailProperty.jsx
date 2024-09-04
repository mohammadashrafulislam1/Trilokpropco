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
    <div className="mb-20">
      <Header isDefault={false} />

      {/* Custom Navigation Buttons */}
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${property?.galleryImages?.[activeIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '670px',
        position:'relative'
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

      <div>
        <div className=" absolute bottom-12 !right-[-500px]">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={12}
            slidesPerView={2}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={setSwiperInstance}
          >
            {property?.galleryImages?.map((image, index) => (
              <SwiperSlide
                key={index}
                className={`!w-[160px] !h-[100px] flex items-center justify-center gap-5 ${
                  index === activeIndex ? "border-[3px] border-[#046307] rounded-[10px] !h-[103px]" : "rounded-[10px] "
                }`}
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover rounded-[10px]"
                  style={{
                    opacity: index === activeIndex ? 1 : 0.9,
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
