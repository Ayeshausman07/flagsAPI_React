// components/FlagDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'react-feather';

const FlagDetail = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://restcountries.com/v3.1/alpha/${countryId}`)
      .then((response) => {
        if (!response.ok) throw new Error('Country not found');
        return response.json();
      })
      .then((data) => setCountry(data[0]))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [countryId]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-8 text-center ">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Error: {error}</h2>
      <Link to="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
        Back to Home
      </Link>
    </div>
  );

  const coordinates = country.latlng || [];
  const lat = coordinates[0];
  const lng = coordinates[1];
  const mapUrl = `https://maps.google.com?q=${lat},${lng}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=5&output=embed`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center mt-10 gap-2 mb-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        <ArrowLeft size={18} />
        <span>Back to All Countries</span>
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <div className="shadow-lg rounded-lg overflow-hidden border-4 border-blue-100">
          <img 
            src={country.flags.svg} 
            alt={country.name.common} 
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              {country.name.common}
            </h1>
            <p className="text-blue-600 italic">
              {country.name.official}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-700">Population:</p>
                <p className="text-blue-900">{country.population.toLocaleString()}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-700">Region:</p>
                <p className="text-blue-900">{country.region}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-700">Subregion:</p>
                <p className="text-blue-900">{country.subregion || 'N/A'}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-700">Timezones:</p>
                <p className="text-blue-900">{country.timezones?.join(', ') || 'N/A'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-700">Capital:</p>
                <p className="text-blue-900">{country.capital?.join(', ') || 'N/A'}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-700">Currencies:</p>
                <p className="text-blue-900">
                  {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-700">Languages:</p>
                <p className="text-blue-900">
                  {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-700">Area:</p>
                <p className="text-blue-900">{country.area?.toLocaleString()} km²</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="font-semibold text-blue-700">Location Coordinates:</p>
            <p className="text-blue-900">Latitude: {lat}°, Longitude: {lng}°</p>
            <a 
              href={mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900 block mt-2"
            >
              View Exact Location on Google Maps
            </a>
          </div>

          {country.borders && (
            <div className="pt-4">
              <h3 className="font-semibold text-lg mb-3 text-blue-800">Border Countries:</h3>
              <div className="flex flex-wrap gap-3">
                {country.borders.map((border) => (
                  <Link
                    key={border}
                    to={`/flag/${border}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">Exact Map Location</h2>
        <div className="w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
          <iframe
            src={embedMapUrl}
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Country Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FlagDetail;
