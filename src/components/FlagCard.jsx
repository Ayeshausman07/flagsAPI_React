// components/FlagCard.jsx
import { Link } from 'react-router-dom';

const FlagCard = ({ country }) => {
  return (
    <div className="border border-gray-200 mt-20 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 m-4 bg-white">
      <div className="relative pb-3/4 h-48 bg-gray-100">
        <img 
          src={country.flags.png} 
          alt={country.name.common} 
          className="absolute h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{country.name.common}</h3>
        
        <div className="text-sm text-gray-600 mb-3">
          <p className="truncate"><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
          <p><span className="font-semibold">Population:</span> {country.population?.toLocaleString() || 'N/A'}</p>
          <p><span className="font-semibold">Region:</span> {country.region || 'N/A'}</p>
        </div>
        
        <Link 
          to={`/flag/${country.cca3}`} 
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default FlagCard;