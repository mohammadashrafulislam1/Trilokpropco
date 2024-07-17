import axios from "axios";
import { useEffect, useState } from "react";
import { endPoint } from "../../forAll/forAll";
import Stats from "../Component/Stats/Stats";

const Root = () => {
    const [propertiesData, setPropertiesData] = useState(null);
    const [developerData, setDeveloperData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [
            developerResponse,
            propertiesResponse,
          ] = await Promise.all([
            axios.get(`${endPoint}/developer`),
            axios.get(`${endPoint}/property`),
          ]);
          setDeveloperData(developerResponse.data);
          setPropertiesData(propertiesResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [endPoint]);
  

    return (
    <div className="">
        <div className="flex items-center justify-center flex-col gap-8 lg:gap-12 mt-6">
        <div className="flex justify-between lg:gap-[55rem] gap-[16rem] dashboard-title items-center">
        <h4 className="text-xl font-semibold">Overview</h4>
        <p>Overview</p>
        </div>
         <Stats propertiesData={propertiesData} developerData={developerData} />
   </div>
    </div>   
    );
};

export default Root;