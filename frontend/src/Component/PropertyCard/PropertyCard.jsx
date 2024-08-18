import { useEffect, useState } from "react";
import { endPoint } from "../ForAll/ForAll";
import { SlLocationPin } from "react-icons/sl";
import { FcDataConfiguration } from "react-icons/fc";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";

const PropertyCard = ({ property }) => {
    const [curentLocation, setCurentLocation] = useState(null);
    const [curentStatus, setCurentStatus] = useState(null);
    const [curentType, setCurentType] = useState(null);
    console.log(curentType)
    useEffect(() => {
        const fetchLocation = async () => {
            const cityResponse = await fetch(`${endPoint}/city`);
            const cityData = await cityResponse.json();
            const locationData = cityData.find(
                (city) => city._id === property?.location
            );
            setCurentLocation(locationData);
            console.log(cityData, locationData);
        };
        fetchLocation();
        const fetchStatus = async () =>{
            const statusResponse = await fetch(`${endPoint}/status`);
            const statusData = await statusResponse.json();
            const status = statusData.find(
                (status) => status._id === property?.status
            );
            setCurentStatus(status);
        }
        fetchStatus();

        const fetchType = async () => {
            const typeResponse = await fetch(`${endPoint}/type`);
            const typeData = await typeResponse.json();
            const type = typeData.find(
                (type) => type._id === property?.type
            );
            setCurentType(type);
        };
        fetchType();
    }, [property]);
   console.log(curentStatus)
    return (
        <div>
            <div>
                <img
                    src={property?.galleryImages[0]}
                    alt={property?.name}
                    className="h-[330px] rounded-[30px] mt-12 relative"
                />
                 
                {property?.exclusive && (
                    <div className="bg-gradient-to-r from-[#E7C578] to-[#C19554]  h-[30px] flex items-center justify-center rounded-r-[10px] absolute top-[15%] text-white font-normal uppercase px-3 text-[19px] Bebas-Neue pt-1"
                    style={{
                        letterSpacing:'1px',
                      }}>Exclusive</div>
                )}
       <div className="absolute top-[60%] flex px-5 justify-between w-full">
        
       <p className="text-[#ffffff] flex items-center gap-2 bg-[#dfdfdfbe] px-4 rounded-full">
       <img src={curentType?.logo} alt={curentType?.type} className="w-[20px] h-[20px]" />
       <span className="font-normal text-[#046307]">{curentType?.type}</span></p>

       <div>
         {/* Compare icon  */}
         <div className="text-white text-[12px] lg:text-[25px] indicator border-white border-[3px] rounded-full p-1 lg:p-2 mr-3">
          <span className="absolute bottom-[-10px] left-[-10px] badge bg-[#046307] text-white border-0 p-1">
            +
          </span>
          <IoGitCompareOutline className="font-[900] text-[16px]"/>
        </div>

        {/* Fav icon  */}
        <div className="text-white text-[12px] lg:text-[25px] indicator border-white border-[3px] rounded-full p-1 lg:p-2">
        <span className="absolute bottom-[-10px] left-[-10px] badge bg-[#046307] text-white border-0 p-1">
            +
          </span>
          <FaRegHeart className="font-[900] text-[16px]" />
        </div>
       </div>
       </div>
         
            </div>
            <div className="mt-6 text-black">
                <h3 className="text-[26px] font-semibold !mb-0">₹ {property?.priceRange}</h3>
                <h4 className="text-[20px] font-medium !mt-0">{property?.name}</h4>
                <p className="text-[#9a9a9a] flex items-center gap-2"><SlLocationPin /><span>{curentLocation?.name}</span></p>
                <p className="flex items-center justify-between text-[15px]">
                    <span className="text-[#000] flex items-center gap-2">
                    <FcDataConfiguration/> {property?.configuration}
                    </span>
                    <span className="text-[#000] flex items-center gap-2">
                    <img src={curentStatus?.image} alt={curentStatus?.status} className="w-[24px] h-[24px] font-bold"/> <span className="font-bold">{curentStatus?.status}</span>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default PropertyCard;
