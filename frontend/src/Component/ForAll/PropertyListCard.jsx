import { useEffect, useState } from "react";
import { endPoint } from "./ForAll";
import { SlLocationPin } from "react-icons/sl";

const PropertyListCard = (property) => {
    console.log(property.property)
    const [curentLocation, setCurentLocation] = useState(null);
    const [curentStatus, setCurentStatus] = useState(null);
    const [curentType, setCurentType] = useState(null);
    const [curentDeveloper, setCurentDeveloper] = useState(null);
    const [isInCompare, setIsInCompare] = useState(false);
    const [isInFav, setIsInFav] = useState(false);

    useEffect(() => {
        const fetchLocation = async () => {
            const cityResponse = await fetch(`${endPoint}/city`);
            const cityData = await cityResponse.json();
            const locationData = cityData.find(
                (city) => city._id === property?.property?.location
            );
            setCurentLocation(locationData);
        };
        fetchLocation();

        const fetchStatus = async () =>{
            const statusResponse = await fetch(`${endPoint}/status`);
            const statusData = await statusResponse.json();
            const status = statusData.find(
                (status) => status._id === property?.property?.status
            );
            setCurentStatus(status);
        }
        fetchStatus();

        const fetchType = async () => {
            const typeResponse = await fetch(`${endPoint}/type`);
            const typeData = await typeResponse.json();
            const type = typeData.find(
                (type) => type._id === property?.property?.type
            );
            setCurentType(type);
        };
        fetchType();

        const fetchDeveloper = async () => {
            const developerResponse = await fetch(`${endPoint}/developer`);
            const developerData = await developerResponse.json();
            const developer = developerData.find(
                (developer) => developer._id === property?.property?.developer
            );
            setCurentDeveloper(developer);
        };
        fetchDeveloper();

        // Check if the property is already in the compare and favorite lists on component load
        const compareList = JSON.parse(localStorage.getItem("compareList")) || [];
        const favList = JSON.parse(localStorage.getItem("favList")) || [];
        const isAlreadyInCompare = compareList.some(item => item._id === property._id);
        const isAlreadyInFav = favList.some(item => item._id === property._id);
        setIsInCompare(isAlreadyInCompare);
        setIsInFav(isAlreadyInFav);
    }, [property]);

    const handleCompareClick = () => {
        let compareList = JSON.parse(localStorage.getItem("compareList")) || [];
    
        if (isInCompare) {
            // Remove the property from the compare list
            compareList = compareList.filter(item => item._id !== property._id);
        } else {
            // Check if the compare list already has 4 properties
            if (compareList.length >= 4) {
                alert("You can only compare up to 4 properties.");
                return;
            }
            // Add the property to the compare list
            compareList.push(property);
        }
    
        // Update localStorage
        localStorage.setItem("compareList", JSON.stringify(compareList));
    
        // Dispatch a custom event to notify header
        window.dispatchEvent(new Event('compareListUpdated'));
    
        // Update the state
        setIsInCompare(!isInCompare);
    };
    
    
    const handleFavClick = () => {
        let favList = JSON.parse(localStorage.getItem("favList")) || [];
    
        if (isInFav) {
            // Remove the property from the favorite list
            favList = favList.filter(item => item._id !== property._id);
        } else {
            // Add the property to the favorite list
            favList.push(property);
        }
    
        // Update localStorage
        localStorage.setItem("favList", JSON.stringify(favList));
    
        // Dispatch a custom event to notify header
        window.dispatchEvent(new Event('favListUpdated'));
    
        // Update the state
        setIsInFav(!isInFav);
    };
    

    return (
        <div>
            <div>
                <img src={property?.property?.galleryImages[0]} alt="" />
            </div>

            <div>
                <h4 className="text-[20px] font-semibold text-black mb-0">{property?.property?.name}</h4>
                <h6 className="text-[16px] font-normal text-black mt-[-4px]">by {curentDeveloper?.name}</h6>
                <p className="flex items-center gap-2"><SlLocationPin/> {curentLocation.name}</p>
                <p className="text-[16px] font-normal text-black mt-[-4px]">₹   {property?.property?.priceRange}</p>
            </div>
        </div>
    );
};

export default PropertyListCard;