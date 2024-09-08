import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "../../Component/Navigation/Header";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { endPoint } from "../../Component/ForAll/ForAll";
import {
  FaAngleLeft,
  FaAngleRight,
  FaHeart,
  FaIndianRupeeSign,
  FaRegHeart,
} from "react-icons/fa6";
import { IoBedOutline, IoResize, IoShareSocial } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import { BsThreeDots } from "react-icons/bs";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
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
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amenities, setAmenities] = useState([]);
  console.log(property, property?.specifications);
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(9);
  const [loanTenure, setLoanTenure] = useState(20); // in years
  const [tenureType, setTenureType] = useState('years'); // 'years' or 'months'
  
  useEffect(() => {
    const fetchProperty = async () => {
      const response = await fetch(`${endPoint}/property/${id}`);
      const propertyData = await response.json();
      setProperty(propertyData);
      if (propertyData.developer) {
        const developerResponse = await fetch(`${endPoint}/developer`);
        const developerData = await developerResponse.json();
        const foundDeveloper = developerData.find(
          (d) => d._id === propertyData.developer
        );
        setDeveloper(foundDeveloper);
      }
      if (propertyData.type) {
        const typeResponse = await fetch(`${endPoint}/type`);
        const typeData = await typeResponse.json();
        const foundType = typeData.find((d) => d._id === propertyData.type);
        setType(foundType);
      }
      if (propertyData.location) {
        const locationResponse = await fetch(`${endPoint}/city`);
        const locationData = await locationResponse.json();
        const foundLocation = locationData.find(
          (d) => d._id === propertyData.location
        );
        setLocation(foundLocation);
      }
      if (propertyData.status) {
        const statusResponse = await fetch(`${endPoint}/status`);
        const statusData = await statusResponse.json();
        const foundStatus = statusData.find(
          (d) => d._id === propertyData.status
        );
        setStatus(foundStatus);
      }
      if(propertyData.amenities){
        const amenityResponse = await fetch(`${endPoint}/amenity`);
        const amenityData = await amenityResponse.json();
        // Map through the propertyData amenities and match with fetched amenityData
      const matchedAmenities = propertyData.amenities.map((amenityId) => {
        // Find the amenity in amenityData by matching the ID
        return amenityData.find((amenity) => amenity._id === amenityId);
      });
      setAmenities(matchedAmenities)
      }
    };
    fetchProperty();
  }, [id, property]);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(activeIndex);
    }
    
  }, [activeIndex, swiperInstance]);
  useEffect(() => {
    if (property?.plans?.length > 0) {
      // Only set the selectedPlan when it's null (initial load)
      if (!selectedPlan) {
        setSelectedPlan(property.plans[0]);
      }
    }
  }, [property, selectedPlan]);
  

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
    const isFavorite = favList.some((item) => item._id === property?._id);
    setIsInFav(isFavorite);
  }, [property._id]);

  const handleFavClick = () => {
    let favList = JSON.parse(localStorage.getItem("favList")) || [];
    if (isInFav) {
      // Remove the property from the favorite list
      favList = favList.filter((item) => item._id !== property?._id);
    } else {
      // Add the property to the favorite list
      favList.push(property);
    }

    console.log(favList);
    // Update localStorage

    localStorage.setItem("favList", JSON.stringify(favList));

    // Dispatch a custom event to notify header
    window.dispatchEvent(new Event("favListUpdated"));

    // Update the state
    setIsInFav(!isInFav);
  };

  const [loading, setLoading] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1"); // Default to US code

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const codes = data
          .map((country) => ({
            name: country.name.common,
            code:
              country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : ""),
          }))
          .filter((c) => c.code); // Filter out countries without a code
        setCountryCodes(codes);
      })
      .catch((error) => console.error("Error fetching country codes:", error));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      option: "Buy",
      name: e.target.name.value,
      email: e.target.email.value,
      phone: `${selectedCountryCode} ${e.target.phone.value}`,
      project: property?.name,
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
  // Handle click on a planType button
  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };
// Helper function to calculate EMI
const calculateEMI = (amount, rate, tenure, tenureType) => {
  const monthlyRate = rate / 12 / 100;
  const months = tenureType === 'years' ? tenure * 12 : tenure;
  const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);
  return emi;
};

// Calculate EMI, interest, and total payment
const emi = calculateEMI(loanAmount, interestRate, loanTenure, tenureType);
const totalInterest = emi * (loanTenure * (tenureType === 'years' ? 12 : 1)) - loanAmount;
const totalPayment = loanAmount + totalInterest;

// Pie chart data
const chartData = {
  labels: ['Principal', 'Interest'],
  datasets: [{
    data: [loanAmount, totalInterest],
    backgroundColor: ['#36A2EB', '#FF6384'],
  }],
};

useEffect(() => {
  // Cleanup chart on component unmount or when the data changes
  return () => {
    ChartJS.getChart('loan-chart')?.destroy();
  };
}, [loanAmount, interestRate, loanTenure, tenureType]);
  console.log(amenities)
  return (
    <div className="mb-20 overflow-hidden">
      <Header isDefault={false} />
      <ToastContainer />
      {/* Custom Navigation Buttons and slider */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${property?.galleryImages?.[activeIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "670px",
          position: "relative",
        }}
      >
        <div className="flex items-center justify-between pt-3 px-8">
          <div className="flex gap-2 text-[#ffffff77] text-4xl">
            {/* Fav icon */}
            {isInFav ? (
              <div
                onClick={handleFavClick}
                className={`text-[#046307] text-4xl cursor-pointer`}
              >
                <FaHeart className="" />
              </div>
            ) : (
              <div
                onClick={handleFavClick}
                className={` text-[#ffffff77] text-4xl cursor-pointer`}
              >
                <FaRegHeart className="" />
              </div>
            )}
            <IoShareSocial />
          </div>
          <div>
            <img
              src={developer.image}
              alt={developer.name}
              className="w-[70px] h-[70px] rounded-full opacity-70"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {isHovering && (
              <div
                style={{
                  background: "rgba( 255, 255, 255, 0.25 )",
                  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                  backdropFilter: "blur( 6px )",
                  borderRadius: "10px",
                  WebkitBackdropFilter: "blur( 6px )",
                  border: "1px solid rgba( 255, 255, 255, 0.18 )",
                }}
                className="md:w-[500px] mt-2 md:p-4 bg-white text-white shadow-lg rounded-md z-10 p-2 absolute right-10 flex items-center gap-3 ml-3"
              >
                <img
                  src={developer.image}
                  alt={developer.name}
                  className="w-[150px] h-[100px]"
                />
                <div>
                  <h5 className="font-semibold text-lg">{developer.name}</h5>
                  <p className="md:text-[16] text-[12px]">
                    {developer.details}
                  </p>
                </div>
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
            <img
              src={type?.logo}
              alt={type?.type}
              className="w-[50px] h-[50px] bg-[#fff] p-2"
            />
            <h5 className="text-2xl font-semibold text-white">{type?.type}</h5>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={12}
            slidesPerView={2.9}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            onSwiper={setSwiperInstance}
            className="swiper-container !mr-0  !absolute md:!bottom-14 !bottom-32 !right-[-250px]"
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

      <div className="lg:flex gap-5 mt-10 md:ml-10 md:mr-6">
        {/* Full left side details  */}
        <div className="lg:w-[65%]">
          <h2 className="text-4xl text-black font-semibold">
            {property?.name}
          </h2>
          <p className="text-[14px] text-black ml-5 mb-2">{location?.name}</p>
          <hr />
          <div className="flex gap-3 my-2">
            <div className="text-xl text-black flex gap-4 items-center">
              <IoBedOutline className="text-2xl" />
              <p>{property?.configuration}</p>
            </div>

            <div className="text-xl text-black flex gap-4 items-center">
              <IoResize className="text-2xl border-2 border-black rounded-[4px] font-semibold" />
              <p>{property?.size}</p>
            </div>

            <div className="text-xl text-black flex gap-4 items-center">
              <img
                src={status?.image}
                className="text-2xl font-semibold"
                alt={status?.status}
              />
              <p>{status?.status}</p>
            </div>
          </div>
          <hr />
          {/* price, title and contact btn */}
          <div className="flex items-center justify-between gap-3 my-8">
            <div className="flex items-center gap-3 my-8">
              <button className="bg-black text-white px-20 py-3 rounded-xl">
                Contact
              </button>
              <button className="bg-[#dbdbdb] text-black px-3 py-3 rounded-xl">
                <span className="bg-white border-[1px] border-black text-[12px] p-1 rounded-md flex items-center justify-center">
                  <BsThreeDots />
                </span>
              </button>
            </div>
            <h3 className="text-2xl flex gap-1 text-black items-center">
              PRICE RANGE:{" "}
              <span className="flex gap-1 font-bold items-center">
                <FaIndianRupeeSign />
                {property?.priceRange}
              </span>
            </h3>
          </div>
          {/* project overview section */}
          <div>
            <h2 className="text-3xl font-semibold text-black poppins">
              Project Overview
            </h2>
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="text-center border py-6 px-3 rounded-2xl">
                <h3 className="text-2xl text-black font-medium uppercase">
                  POSSESSION DATE
                </h3>
                <p className="uppercase text-[18px] text-black font-light">
                  {property?.projectOverview?.possessionStart}
                </p>
              </div>

              <div className="text-center border py-6 px-3 rounded-2xl">
                <h3 className="text-2xl text-black font-medium uppercase">
                  LAND AREA
                </h3>
                <p className="uppercase text-[18px] text-black font-light">
                  {property?.projectOverview?.landArea}
                </p>
              </div>

              <div className="text-center border py-6 px-3 rounded-2xl">
                <h3 className="text-2xl text-black font-medium uppercase">
                  CONFIGURATION
                </h3>
                <p className="uppercase text-[18px] text-black font-light">
                  {property?.projectOverview?.configuration}
                </p>
              </div>

              <div className="text-center border py-6 px-3 rounded-2xl">
                <h3 className="text-2xl text-black font-medium uppercase">
                  FLAT AREA
                </h3>
                <p className="uppercase text-[18px] text-black font-light">
                  {property?.projectOverview?.flatArea}
                </p>
              </div>

              <div className="text-center border py-6 px-3 rounded-2xl">
                <h3 className="text-2xl text-black font-medium uppercase">
                  PRICE RANGE
                </h3>
                <p className="uppercase text-[18px] text-black font-light">
                  {property?.projectOverview?.priceRange}
                </p>
              </div>

              <div className="text-center border py-6 px-3 rounded-2xl">
                <h3 className="text-2xl text-black font-medium uppercase">
                  NO. OF BLOCKS
                </h3>
                <p className="uppercase text-[18px] text-black font-light">
                  {property?.projectOverview?.numberOfBlocks}
                </p>
              </div>

              <div className="text-center border py-6 px-3 rounded-2xl">
                <h3 className="text-2xl text-black font-medium uppercase">
                  ELEVATION
                </h3>
                <p className="uppercase text-[18px] text-black font-light">
                  {property?.projectOverview?.elevation}
                </p>
              </div>

              <div className="text-center border py-6 px-3 rounded-2xl">
                <h3 className="text-2xl text-black font-medium uppercase">
                  NO. OF UNITS
                </h3>
                <p className="uppercase text-[18px] text-black font-light">
                  {property?.projectOverview?.numberOfUnits}
                </p>
              </div>

              <div className="text-center border py-6 px-3 rounded-2xl">
                <h3 className="text-2xl text-black font-medium uppercase">
                  RERA Reg No.
                </h3>
                <p className="uppercase text-[18px] text-black font-light">
                  {property?.projectOverview?.RegistrationNo}
                </p>
              </div>
            </div>
          </div>

          {/* description section*/}
          <div>
            <h2 className="text-3xl font-semibold text-black poppins mt-10 mb-6">
              Description
            </h2>
            <p
              className="text-[18px] text-black font-normal"
              dangerouslySetInnerHTML={{ __html: property?.description }}
            />
          </div>

          {/* project video */}
          <div>
            <h2 className="text-3xl font-semibold text-black poppins mt-10 mb-6">
              Video
            </h2>
            <iframe
              width="100%"
              height="450"
              src={property?.video}
              title={property?.title}
              className="rounded-2xl"
              allowfullscreen
            ></iframe>
          </div>
          
          {/* Price Table */}
          <div>
          <h2 className="text-3xl font-semibold text-black poppins mt-10 mb-6">
              Price
            </h2>
            <table className="table text-center">
              <tr className="bg-[#046307] text-white text-xl font-medium border-0">
                <th className="border-[1px] border-[#ffffff35]">CONFIG.</th>
                <th className="border-[1px] border-[#ffffff35]">SIZE</th>
                <th className="border-[1px] border-[#ffffff35]">PRICE</th>
              </tr>
                {property?.priceDetails?.map(
                  (pd) => (
                    <tr key={pd._id} className="text-black font-normal text-[16px] border-[1px] border-[#00000035]">
                      <td className="border-[1px] border-[#00000035]">{pd?.configuration}</td>
                      <td className="border-[1px] border-[#00000035]">{pd?.size}</td>
                      <td className="border-[1px] border-[#00000035]">{pd?.price}</td>
                    </tr>
                  )
                )}
            </table>
          </div>

          {/* Plans section */}
          <div>
          <h2 className="text-3xl font-semibold text-black poppins mt-10 mb-6">
          Plans
            </h2>
            <div>
        {property?.plans?.map((plan) => (
          <button 
            key={plan._id} 
            onClick={() => handlePlanClick(plan)}
            style={{
              margin: '10px',
              backgroundColor: selectedPlan?._id === plan._id ? '#000' : '#046307',
              color: selectedPlan?._id === plan._id ? '#fff' : '#fff'
            }}
            className="btn btn-sm"
          >
            {plan?.planType}
          </button>
        ))}
      </div>

      {/* Display selected plan details */}
      {selectedPlan && (
        <div className="my-5 mx-5 border rounded-2xl">
          {selectedPlan?.image && <img src={selectedPlan?.image} alt={selectedPlan?.planType} className="!w-full  rounded-t-2xl"/>}
        <div className="bg-[#0000000e] rounded-b-2xl p-4 flex justify-between items-center text-2xl"> 
         {selectedPlan?.price && <p><strong>Price:</strong> {selectedPlan?.price || 'N/A'}</p>}
         {selectedPlan?.size &&<p><strong>Size:</strong> {selectedPlan?.size || 'N/A'}</p>}
         </div>
        </div>
      )}


          </div>

          {/* Amenities section*/}
          <div>
          <h2 className="text-3xl font-semibold text-black poppins mt-10 mb-6">
          Amenities
            </h2>
          <div className="grid grid-cols-4 gap-3">
            {
              amenities?.map((amenity) =>
              (
                <div className="border text-center w-[200px] h-[200px] flex items-center justify-center flex-col relative overflow-hidden rounded-3xl gap-4" key={amenity._id}>
        <img src={amenity?.logo} alt={amenity?.name} />
        <img src={amenity?.logo} alt={amenity?.name}  className="absolute right-0 bottom-0 rotate-[-50deg] opacity-10"/>
        <p className="text-[#000] text-[14px]">{amenity?.name}</p>
    </div>   )
              )
            }
          </div>

          <a href={property?.pdfDownload}><button className="bg-[#ec0000] text-white flex items-center px-8 py-6 relative gap-10 my-10 rounded-2xl">
          <img src="https://i.ibb.co.com/w7HGyvB/Adobe-PDF.webp" alt="Download Brochure | Trilokpropco Real Estate Agent" className="w-[200px] absolute left-[-36px]"/><span className="ml-20 text-3xl font-light ">Download Brochure</span></button></a>
          </div>

          {/* Nearby description section*/}
          <div>
            <h2 className="text-3xl font-semibold text-black poppins mt-10 mb-6">
            What s Nearby
            </h2>
            <p
              className="text-[18px] text-black font-normal"
              dangerouslySetInnerHTML={{ __html: property?.nearbyFacilities
              }}
            />
          </div>

          {/* Location Map section */}
          <div>
          <h2 className="text-3xl font-semibold text-black poppins mt-10 mb-6">
          Location Map
            </h2>
            <iframe
  src={property?.locationMap}
  title="Location Map"
  className="w-full h-[500px] rounded-3xl"
  frameBorder="0"
  allowFullScreen
/>

          </div>

          {/* specifications description section*/}
          <div>
            <h2 className="text-3xl font-semibold text-black poppins mt-10 mb-6">
            Specifications
            </h2>
            <p
              className="text-[18px] text-black font-normal"
              dangerouslySetInnerHTML={{ __html: property?.specifications
              }}
            />
          </div>

          {/* Bank Approve Images */}
          <div>
          <h2 className="text-3xl font-semibold text-black poppins mt-10 msb-6">
          Bank Approval
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {
                property?.bankImages?.map((bImg) =><img key={bImg._id} src={bImg} className="border w-full h-[80px] rounded-xl"
                style={{
                  objectFit:'cover'
                }}/>)
              }
            </div>
          </div>

        </div>

        {/* Form right side  */}
        <div className="lg:w-[35%] my-10 relative">
          <form
            onSubmit={handleSubmit}
            className="shadow-xl p-10 rounded-[30px] w-full  bg-white "
          >
            <div className="label text-black">
              <img
                src="https://i.ibb.co/f1L99L9/18a006575c097b8b99494b75da063caf-removebg-preview-2.webp"
                alt="Trilokpropco"
                className="w-1/4"
              />
            </div>

            <div>
              <div className="label mt-4">
                <span className="label-text text-black ">Your name</span>
              </div>
              <input
                type="text"
                required
                name="name"
                placeholder="Type name here"
                className="border-b-[2px]  p-3 focus:border-[#046307] border-[#b4b4b468] w-full focus:text-black"
              />
            </div>

            <div>
              <div className="label mt-4">
                <span className="label-text text-black ">Your email</span>
              </div>
              <input
                type="email"
                required
                name="email"
                placeholder="Type email here"
                className="border-b-[2px]  p-3 focus:border-[#046307] border-[#b4b4b468] w-full focus:text-black"
              />
            </div>

            <div>
              <div className="label mt-4">
                <span className="label-text text-black ">Your phone</span>
              </div>
              <div className="flex w-full">
                <select
                  onChange={(e) => setSelectedCountryCode(e.target.value)}
                  value={selectedCountryCode}
                  className=" border-b-[2px] border-[#b4b4b468] w-1/4 focus:border-[#046307] p-3 text-black"
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
                  className="border-b-[2px]  p-3 focus:border-[#046307] border-[#b4b4b468] focus:text-black w-3/4"
                />
              </div>
            </div>

            <div>
              <div className="label mt-4">
                <span className="label-text text-black ">Your message</span>
              </div>
              <textarea
                className="border-[2px]  p-3 focus:border-[#046307] border-[#b4b4b468] text-area w-full mt-4 rounded-xl focus:text-black"
                placeholder="What is in your mind?"
                rows={3}
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

       {/* Loan Calculator Section */}
      <div className="loan-calculator">
        <div className="left-section">
          <h2>Loan Details</h2>
          <div>
            <label>Loan Amount (INR):</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Interest Rate (%):</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Loan Tenure:</label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
            />
            <select
              value={tenureType}
              onChange={(e) => setTenureType(e.target.value)}
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        {/* Loan Summary Section */}
        <div className="middle-section">
          <h3>Loan Summary</h3>
          <p>Loan EMI: {emi.toFixed(2)} INR</p>
          <p>Total Interest Payable: {totalInterest.toFixed(2)} INR</p>
          <p>Total Payment: {totalPayment.toFixed(2)} INR</p>
        </div>

        {/* Render Pie Chart only when data is valid */}
        {loanAmount > 0 && totalInterest > 0 && (
          <div className="right-section">
            <Pie id="loan-chart" data={chartData} />
          </div>
        )}
      </div>
     </div>
  );
};

export default DetailProperty;
