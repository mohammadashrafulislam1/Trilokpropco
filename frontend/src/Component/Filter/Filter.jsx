import { useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { endPoint } from "../ForAll/ForAll";

const Filter = () => {

    const [typeOptions, setTypeOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const typeResponse = await fetch(`${endPoint}/type`);
        const cityResponse = await fetch(`${endPoint}/city`);
        const statusResponse = await fetch(`${endPoint}/status`);

        const types = await typeResponse.json();
        const cities = await cityResponse.json();
        const statuses = await statusResponse.json();

        setTypeOptions(types);
        setCityOptions(cities);
        setStatusOptions(statuses);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilters();
  }, []);

    return (
    <div>  
            <div className="flex items-end justify-center mb-10 gap-5 mt-10">
          <div>
            <label htmlFor="city">Location</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className=" input w-full input-bordered">
        <option value="">All Cities</option>
        {cityOptions.map(city => (
          <option key={city._id} value={city._id}>{city.name}</option>
        ))}
      </select>

            </div>
            <div>
            <label htmlFor="city">Type</label>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="select select-bordered w-full max-w-xs">
        <option value="">All Types</option>
        {typeOptions.map(type => (
          <option key={type._id} value={type._id}>{type.type}</option>
        ))}
      </select>
            </div> 

            <div>
            <label htmlFor="city">For</label>
            <select className="select select-bordered w-full">
  <option disabled selected>For?</option>
  <option>Buy</option>
  <option>Sale</option>
  <option>Rent</option>
</select>
            </div> 

            <div>
            <label htmlFor="city">Status</label>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="select select-bordered w-full">
        <option value="">All Statuses</option>
        {statusOptions.map(status => (
          <option key={status._id} value={status._id}>{status.status}</option>
        ))}
      </select>
            </div> 
            <button className="btn bg-[#046307] text-white"><FaSearch /></button>
            </div>
    </div>
    );
};

export default Filter;