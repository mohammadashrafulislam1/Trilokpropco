import { useEffect, useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  // State variables to store selected filter values
  const [selectedType, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // State variables to store fetched options for filters
  const [typeOptions, setTypeOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
   console.log(typeOptions, cityOptions, statusOptions)
  
  const navigate = useNavigate();

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

  const handleSearch = () => {
    const query = new URLSearchParams({
      type: selectedType,
      city: selectedCity,
      status: selectedStatus,
    }).toString();

    navigate(`/results?${query}`);
  };

  return (
    <div>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">All Types</option>
        {typeOptions?.map(type => (
          <option key={type.id} value={type.value}>{type.type}</option>
        ))}
      </select>

      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="">All Cities</option>
        {cityOptions?.map(city => (
          <option key={city.id} value={city.value}>{city.name}</option>
        ))}
      </select>

      <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
        <option value="">All Statuses</option>
        {statusOptions?.map(status => (
          <option key={status.id} value={status.status}>{status.status}</option>
        ))}
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
