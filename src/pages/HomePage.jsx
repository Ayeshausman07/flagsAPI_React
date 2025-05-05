import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FlagCard from '../components/FlagCard';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 12;

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

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Grid of Flags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center mt-20 text-xl text-blue-600 font-semibold animate-pulse">
            Loading countries...
          </div>
        ) : currentCountries.length > 0 ? (
          currentCountries.map((country) => (
            <FlagCard key={country.cca3} country={country} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center mt-20 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
              alt="Not found"
              className="w-28 h-28 sm:w-32 sm:h-32 opacity-70"
            />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mt-4">No Flags Found</h2>
            <p className="text-gray-500 text-sm sm:text-base">We couldn’t find any country matching your search.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base shadow transition font-semibold ${
                currentPage === pageNum
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
