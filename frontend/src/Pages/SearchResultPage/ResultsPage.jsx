import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { endPoint } from "../../Component/ForAll/ForAll";
const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const type = queryParams.get('type');
        const city = queryParams.get('city');
        const status = queryParams.get('status');

        const response = await fetch(`${endPoint}/property?type=${type}&city=${city}&status=${status}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [location.search]);

  return (
    <div>
      <h1>Search Results</h1>
      {results.length > 0 ? (
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default ResultsPage;
