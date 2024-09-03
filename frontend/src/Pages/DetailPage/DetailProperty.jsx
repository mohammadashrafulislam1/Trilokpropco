import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../../Component/ForAll/ForAll";
import Header from "../../Component/Navigation/Header";

const DetailProperty = () => {
    const {id} = useParams();
    const [property, setProperty] = useState();

    useEffect(()=>{
        const fetchProperty = async() =>{
         const response = await fetch(`${endPoint}/property/${id}`)
         const propertyData = await response.json();
         setProperty(propertyData)
        }
        fetchProperty()
    },[id])
return (
   <div>
    <Header isDefault={false} />
            
   </div>
);
};

export default DetailProperty;