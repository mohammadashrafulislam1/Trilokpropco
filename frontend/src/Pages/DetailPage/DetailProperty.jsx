import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from "../../Component/Navigation/Header";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { endPoint } from "../../Component/ForAll/ForAll";
import { FaAngleLeft, FaAngleRight, FaHeart, FaRegHeart} from "react-icons/fa6";
import { IoBedOutline, IoResize, IoShareSocial } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

const DetailProperty = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [developer, setDeveloper] = useState({});
  const [location, setLocation] = useState({});
  const [status, setStatus] = useState({});
  const [type, setType] = useState({});
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isInFav, setIsInFav] = useState(false);
  console.log(property, status)
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
      if(propertyData.type){
        const typeResponse = await fetch(`${endPoint}/type`);
        const typeData = await typeResponse.json();
        const foundType = typeData.find(d => d._id === propertyData.type);
        setType(foundType)
      }
      if(propertyData.location){
        const locationResponse = await fetch(`${endPoint}/city`);
        const locationData = await locationResponse.json();
        const foundLocation = locationData.find(d => d._id === propertyData.location);
        setLocation(foundLocation)
      }
      if(propertyData.status){
        const statusResponse = await fetch(`${endPoint}/status`);
        const statusData = await statusResponse.json();
        const foundStatus = statusData.find(d => d._id === propertyData.status);
        setStatus(foundStatus)
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

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  useEffect(() => {
    const favList = JSON.parse(localStorage.getItem("favList")) || [];
    const isFavorite = favList.some(item => item._id === property?._id);
    setIsInFav(isFavorite);
  }, [property._id]);
  
const handleFavClick = () => {
        let favList = JSON.parse(localStorage.getItem("favList")) || [];
        if (isInFav) {
            // Remove the property from the favorite list
            favList = favList.filter(item => item._id !== property?._id);
        } else {
            // Add the property to the favorite list
            favList.push(property);
        }
    
        console.log(favList)
        // Update localStorage
        
        localStorage.setItem("favList", JSON.stringify(favList));
    
        // Dispatch a custom event to notify header
        window.dispatchEvent(new Event('favListUpdated'));
    
        // Update the state
        setIsInFav(!isInFav);
    };

    const [selectedOption, setSelectedOption] = useState("sale");
  const [loading, setLoading] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1"); // Default to US code

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const codes = data.map((country) => ({
          name: country.name.common,
          code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
        })).filter(c => c.code); // Filter out countries without a code
        setCountryCodes(codes);
      })
      .catch((error) => console.error("Error fetching country codes:", error));
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      option: selectedOption,
      name: e.target.name.value,
      email: e.target.email.value,
      phone: `${selectedCountryCode} ${e.target.phone.value}`,
      project: e.target.project.value,
      message: e.target.message.value,
    };

    fetch(`${endPoint}/inquire`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          toast.success("Successfully sent email to owner.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error sending email to owner.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="mb-20 overflow-hidden">
      <Header isDefault={false} />
      <ToastContainer />
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
        <div className="flex items-center justify-between pt-3 px-8">
          <div className="flex gap-2 text-[#ffffff77] text-4xl">
            {/* Fav icon */}
        {
            isInFav? <div
            onClick={handleFavClick}
            className={`text-[#046307] text-4xl cursor-pointer`}
          >
            <FaHeart className="" />
          </div> :
          <div
          onClick={handleFavClick}
          className={` text-[#ffffff77] text-4xl cursor-pointer`}
        >
          <FaRegHeart className="" />
        </div>
        }
            <IoShareSocial />
          </div>
         <div>
         <img src={developer.image} alt={developer.name} className="w-[70px] h-[70px] rounded-full opacity-70"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}/>
          {isHovering && (
    <div style={{
      background: 'rgba( 255, 255, 255, 0.25 )',
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter: 'blur( 6px )',
      borderRadius: '10px',
      WebkitBackdropFilter: 'blur( 6px )',
      border: '1px solid rgba( 255, 255, 255, 0.18 )',
    }} className="md:w-[500px] mt-2 md:p-4 bg-white text-white shadow-lg rounded-md z-10 p-2 absolute right-10 flex items-center gap-3 ml-3">
      <img
        src={developer.image}
        alt={developer.name}
        className="w-[150px] h-[100px]"
      />
      <div><h5 className="font-semibold text-lg">{developer.name}</h5>
      <p className="md:text-[16] text-[12px]">{developer.details}</p></div>
    </div>
    )} 
         </div>
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

        <div className="md:flex items-center justify-between mx-10">
          <div className="flex gap-5 items-center  absolute bottom-14">
            <img src={type?.logo} alt={type?.type} className="w-[50px] h-[50px] bg-[#fff] p-2"/>
            <h5 className="text-2xl font-semibold text-white">{type?.type}</h5>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={12}
            slidesPerView={3.2}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            
            onSwiper={setSwiperInstance}
            className="swiper-container !mr-0  !absolute md:!bottom-14 !bottom-32 !right-[-450px]"
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

     <div className="flex gap-5 mt-10 mx-10">

       {/* Full left side details  */}
       <div className="w-[65%]">
        <h2 className="text-4xl text-black font-semibold">{property?.name}</h2>
        <p className="text-[14px] text-black ml-5 mb-2">{location?.name}</p>
        <hr />
        <div className="flex gap-3">
        <div className="text-xl text-black flex gap-4 items-center">
        <IoBedOutline className="text-2xl" />
        <p>{property?.configuration}</p>
        </div>

        <div className="text-xl text-black flex gap-4 items-center">
        <IoResize  className="text-2xl border-2 border-black rounded-[4px] font-semibold" />
        <p>{property?.size}</p>
        </div>
        
        <div className="text-xl text-black flex gap-4 items-center">
        <img src={status?.image}  className="text-2xl font-semibold" alt={status?.status} />
        <p>{status?.status}</p>
        </div>

        </div>
        </div>
  
        {/* Form right side  */}
         <div className="w-[35%]">
         <form onSubmit={handleSubmit} className="bg-black p-10 rounded-[30px] w-full">
            <div className="label text-white">
              <span className="label-text text-white text-xl">I'm interested in:</span>
            </div>
            
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={() => handleOptionClick("sale")}
                className={`w-fit py-3 px-6 rounded-full ${
                  selectedOption === "sale"
                    ? "bg-[#046307] text-white"
                    : "bg-transparent border border-[#ffffff] text-[#ffffff]"
                }`}
              >
                Sale
              </button>
              <button
                type="button"
                onClick={() => handleOptionClick("buy")}
                className={`w-fit py-3 px-6 rounded-full ${
                  selectedOption === "buy"
                    ? "bg-[#046307] text-white"
                    : "bg-transparent border border-[#ffffff] text-[#ffffff]"
                }`}
              >
                Buy
              </button>
            </div>
  
            <div>
              <div className="label mt-4">
                <span className="label-text text-white border-b-[1px] w-full border-[#ffffff68]">
                  Your name
                </span>
              </div>
              <input
                type="text"
                required
                name="name"
                placeholder="Type name here"
                className="border-b-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] w-full focus:text-white"
              />
            </div>
  
            <div>
              <div className="label mt-4">
                <span className="label-text text-white border-b-[1px] w-full border-[#ffffff68]">
                  Your email
                </span>
              </div>
              <input
                type="email"
                required
                name="email"
                placeholder="Type email here"
                className="border-b-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] w-full focus:text-white"
              />
            </div>
  
            <div>
              <div className="label mt-4">
                <span className="label-text text-white border-b-[1px] w-full border-[#ffffff68]">
                  Your phone
                </span>
              </div>
              <div className="flex w-full">
                <select
                  onChange={(e) => setSelectedCountryCode(e.target.value)}
                  value={selectedCountryCode}
                  className="bg-black border-b-[3px] border-[#ffffff68] w-1/4 focus:border-[#046307] p-3 text-white"
                >
                  {countryCodes.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="Type phone number"
                  className="border-b-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] focus:text-white w-3/4"
                />
              </div>
            </div>
  
            <div>
              <div className="label mt-4">
                <span className="label-text text-white border-b-[1px] w-full border-[#ffffff68]">
                  Your project
                </span>
              </div>
              <input
                type="text"
                name="project"
                placeholder="Type project name here"
                className="border-b-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] w-full focus:text-white"
              />
            </div>
  
            <div>
              <div className="label mt-4">
                <span className="label-text text-white border-b-[1px] w-full border-[#ffffff68]">
                  Your message
                </span>
              </div>
              <textarea
                className="border-[3px] bg-black p-3 focus:border-[#046307] border-[#ffffff68] text-area w-full mt-4 rounded-3xl focus:text-white"
                placeholder="What is in your mind?"
                rows={4}
                name="message"
              ></textarea>
            </div>
  
            <button
              type="submit"
              className="btn bg-[#046307] border-0 text-white w-full rounded-full mt-6"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send message"}
            </button>
          </form>
         </div>

     </div>

    </div>
  );
};

export default DetailProperty;
