import { useEffect, useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";

const PropertyTypes = () => {
    const [types, setTypes] = useState([]);
    const [typeCounts, setTypeCounts] = useState({});
    
    console.log(types, typeCounts)
    useEffect(() => {
        const fetchTypesAndProperties = async () => {
            try {
                const typeResponse = await fetch(`${endPoint}/type`);
                const typeData = await typeResponse.json();
                setTypes(typeData);

                const propertyResponse = await fetch(`${endPoint}/property`);
                const propertyData = await propertyResponse.json();

                const counts = typeData.reduce((acc, type) => {
                    const count = propertyData.filter(
                        (property) => property.type === type._id
                    ).length;
                    acc[type._id] = count;
                    return acc;
                }, {});

                setTypeCounts(counts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTypesAndProperties();
    }, []);
    return (
        <div>
            
        </div>
    );
};

export default PropertyTypes;