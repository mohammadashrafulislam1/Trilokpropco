import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../../Component/ForAll/ForAll";

const DetailProperty = () => {
    const {id} = useParams();
    const [property, setProperty] = useState();

    useEffect(()=>{
        const fetchProperty = async() =>{
         const response = await fetch(`${endPoint}/property/${id}`)
         const propertyData = await response.json();
         console.log(propertyData)
        }
        fetchProperty()
    },[id])
    return (
        <div>
            
        </div>
    );
};

export default DetailProperty;