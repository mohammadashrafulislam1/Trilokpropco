import axios from "axios";
import { endPoint } from "../../forAll/forAll";
import { useEffect, useState } from "react";


const Properties = () => {
    const [properties, setProperties] = useState();
    const stripHtmlTags = (str) => {
  if (str === null || str === "") return "";
  return str.replace(/<[^>]*>/g, "");
};

const truncateText = (str, numWords) => {
  const words = str.split(" ");
  if (words.length > numWords) {
    return words.slice(0, numWords).join(" ") + "...";
  }
  return str;
};
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${endPoint}/property`);
                console.log(response.data);
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [endPoint]);
    
    return (
    <div>
      <div className="overflow-x-auto ml-10">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Details</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {properties? properties.map((property, index) => 
        <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                {property.galleryImages.map((img, index) => <img key={index}
                  src={img} />)}
              </div>
            </div>
            <div>
              <div className="font-bold">{property.name}</div>
              <div className="text-sm opacity-50">{property.location}</div>
            </div>
          </div>
        </td>
        <td>{truncateText(stripHtmlTags(property.description), 20)}</td>
        <td>{property.priceRange}</td>
        <th className="flex gap-2">
          <button className="btn btn-success text-white btn-xs">update</button>
          <button className="btn btn-error btn-xs text-white">delete</button>
        </th>
      </tr>
      ) :<p>No Property is available.</p>}
      
      </tbody></table></div>      
    </div>
    );
};

export default Properties;