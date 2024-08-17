import { useEffect, useState } from "react";
import { endPoint } from "../ForAll/ForAll";
import { SlLocationPin } from "react-icons/sl";
import { FcDataConfiguration } from "react-icons/fc";

const PropertyCard = ({ property }) => {
    const [curentLocation, setCurentLocation] = useState(null);
    const [curentStatus, setCurentStatus] = useState(null);

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
        fetchStatus()
    }, [property]);
   console.log(curentStatus)
    return (
        <div>
            <div>
                <img
                    src={property?.galleryImages[0]}
                    alt={property?.name}
                    className="h-[330px] rounded-[30px] mt-12"
                />
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
