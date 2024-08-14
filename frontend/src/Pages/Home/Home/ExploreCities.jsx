
import { useEffect, useState } from "react";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import { endPoint } from "../../../Component/ForAll/ForAll";

const ExploreCities = () => {
    const [cities, setCities] = useState([]);
    const [propertyCounts, setPropertyCounts] = useState({});
    console.log(cities, propertyCounts)
    useEffect(() => {
        const fetchCitiesAndProperties = async () => {
            try {
                // Fetch cities
                const cityResponse = await fetch(`${endPoint}/city`);
                const cityData = await cityResponse.json();
                setCities(cityData);

                // Fetch properties
                const propertyResponse = await fetch(`${endPoint}/property`);
                const propertyData = await propertyResponse.json();

                // Count properties per city
                const counts = cityData.reduce((acc, city) => {
                    const count = propertyData.filter(
                        (property) => property.location === city._id
                    ).length;
                    acc[city._id] = count;
                    return acc;
                }, {});

                setPropertyCounts(counts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCitiesAndProperties();
    }, []);

    return (
    <div className="lg:mt-20">
     <SectionTitle value= "Explore Cities"> </SectionTitle>   

     <div className="city-grid">
                {cities.map((city) => (
                    <div key={city._id} className="city-item">
                        <h3>{city.name}</h3>
                        <p>{propertyCounts[city._id] || 0} Properties Available</p>
                    </div>
                ))}
            </div>      
    </div>
    );
};

export default ExploreCities;