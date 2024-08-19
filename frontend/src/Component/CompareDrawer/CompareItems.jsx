import { useEffect, useState } from "react";
import { endPoint } from "../ForAll/ForAll";

const CompareItems = (item) => {
    const {list} = item;
    
    const [curentLocation, setCurentLocation] = useState(null);
    const [curentDeveloper, setCurentDeveloper] = useState(null);
    const [curentStatus, setCurentStatus] = useState(null);
    const [curentType, setCurentType] = useState(null);
    const [isInCompare, setIsInCompare] = useState(false);
    const [isInFav, setIsInFav] = useState(false);

    console.log(list)
    useEffect(() => {
        const fetchLocation = async () => {
            const cityResponse = await fetch(`${endPoint}/city`);
            const cityData = await cityResponse.json();
            const locationData = cityData.find(
                (city) => city._id === list?.location
            );
            setCurentLocation(locationData);
        };
        fetchLocation();

        const fetchStatus = async () =>{
            const statusResponse = await fetch(`${endPoint}/status`);
            const statusData = await statusResponse.json();
            const status = statusData.find(
                (status) => status._id === list?.status
            );
            setCurentStatus(status);
        }
        fetchStatus();

        const fetchType = async () => {
            const typeResponse = await fetch(`${endPoint}/type`);
            const typeData = await typeResponse.json();
            const type = typeData.find(
                (type) => type._id === list?.type
            );
            setCurentType(type);
        };
        fetchType();
        const fetchDeveloper = async () => {
            const developerResponse = await fetch(`${endPoint}/developer`);
            const developerData = await developerResponse.json();
            const developer = developerData.find(
                (developer) => developer._id === list?.developer
            );
            setCurentDeveloper(developer);
        };
        fetchDeveloper();


        // Check if the property is already in the compare and favorite lists on component load
        const compareList = JSON.parse(localStorage.getItem("compareList")) || [];
        const favList = JSON.parse(localStorage.getItem("favList")) || [];
        const isAlreadyInCompare = compareList.some(item => item._id === list._id);
        const isAlreadyInFav = favList.some(item => item._id === list._id);
        setIsInCompare(isAlreadyInCompare);
        setIsInFav(isAlreadyInFav);
    }, [list]);
    return (
    <div>
       <div>
                <div>
                    <img src={list?.galleryImages[0]} alt={list?.name} />
                </div>
                <div>
                    <h2>Title: {list?.name}</h2>
                    <p>Price: {list?.priceRange}</p>
                    <p>Size: {list?.size}</p>
                    <p>Config: {list?.configuration}</p>
                    <p>Location: {curentLocation?.name}</p>
                    <p>Type: {curentType?.type}</p>
                    <p>Status: {curentStatus?.status}</p>
                    <p>Developer: {curentDeveloper?.name}</p>
                    <p>LandArea: {list?.projectOverview.landArea}</p>
                    <p>FlatArea: {list?.projectOverview.flatArea}</p>
                    <p>NumberOfBlocks: {list?.projectOverview.numberOfBlocks}</p>
                    <p>NumberOfUnits: {list?.projectOverview.numberOfUnits}</p>
                </div>
            </div>     
    </div>
    );
};

export default CompareItems;