import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FlagCard from '../components/FlagCard';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q')?.toLowerCase() || '';

  useEffect(() => {
    setLoading(true);
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      });
  }, []);

  const filteredCountries = query
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      )
    : countries;

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        <div className="col-span-full text-center mt-20 text-xl text-blue-600 font-semibold">
          Loading countries...
        </div>
      ) : filteredCountries.length > 0 ? (
        filteredCountries.map((country) => (
          <FlagCard key={country.cca3} country={country} />
        ))
      ) : (
        <div className="col-span-full text-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="Not found"
            className="mx-auto w-32 h-32 opacity-70"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">No Flags Found</h2>
          <p className="text-gray-500">We couldn’t find any country matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
