import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import countryService from '../services/country.service';
import { TCountry } from '../types/country.type';
import { ROUTER_KEYS } from '../keys/links';

export const MainPage = () => {
    const [countries, setCountries] = useState<TCountry[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    useEffect(() => {
      const fetchCountries = async () => {
        const countriesRes = await countryService.getAllCountries();
        setCountries(countriesRes);
      };
  
      fetchCountries();
    }, []);
  
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Available Countries</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCountries.map((country) => (
            <div
              key={country.countryCode}
              className="border p-4 rounded-md hover:bg-gray-100 transition"
            >
              <Link
                to={`/info/${country.countryCode}`}
                className="text-xl text-blue-500 hover:underline"
              >
                {country.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
};