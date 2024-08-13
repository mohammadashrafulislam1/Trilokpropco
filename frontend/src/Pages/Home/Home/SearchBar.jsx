import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { endPoint } from "../../../Component/ForAll/ForAll";

const SearchBar = () => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

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
    // Build the search query parameters
    const queryParams = new URLSearchParams({
      type: selectedType,
      city: selectedCity,
      status: selectedStatus,
    }).toString();

    // Navigate to the results page with the query parameters
    navigate(`/results?${queryParams}`);
  };

  return (
    <div>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">All Types</option>
        {typeOptions.map(type => (
          <option key={type._id} value={type._id}>{type.type}</option>
        ))}
      </select>

      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="">All Cities</option>
        {cityOptions.map(city => (
          <option key={city._id} value={city._id}>{city.name}</option>
        ))}
      </select>

      <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
        <option value="">All Statuses</option>
        {statusOptions.map(status => (
          <option key={status._id} value={status._id}>{status.status}</option>
        ))}
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
