import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TCountryInfo } from '../types/country.type'; 
import countryService from '../services/country.service'; 
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import LoadingComponent from '../elements/spinner.element';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export const CountryPage = () => {
  const { code } = useParams<{ code: string }>(); 
  const [countryInfo, setCountryInfo] = useState<TCountryInfo | null>(null);
  const [populationData, setPopulationData] = useState<any>(null);

  useEffect(() => {
    if (code) {
      const fetchCountryInfo = async () => {
        try {
          const data = await countryService.getCountryInfo(code);
          setCountryInfo(data);
          setPopulationData(data.population); 
        } catch (error) {
          console.error('Error fetching country info:', error);
        }
      };

      fetchCountryInfo();
    }
  }, [code]);

  const chartData = {
    labels: populationData ? populationData.map((item: any) => item.year) : [], 
    datasets: [
      {
        label: 'Population Over Time',
        data: populationData ? populationData.map((item: any) => item.value) : [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  return (
    countryInfo?<div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <img src={countryInfo.flagURI} alt={`Flag of ${countryInfo.commonName}`} className="w-16 h-16 mr-4" />
        <h1 className="text-4xl font-bold">{countryInfo.commonName}</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Border Countries</h2>
        <ul className="space-y-2 mt-2">
          {countryInfo.borders?.map((border) => (
            <li key={border.countryCode} className="text-xl">
              <a href={`/info/${border.countryCode}`} className="text-blue-500 hover:underline">
                {border.commonName}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {populationData && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Population Over Time</h2>
          <div className="mt-4">
            <Line data={chartData} />
          </div>
        </div>
      )}
    </div>:
    <div className="h-screen flex justify-center items-center">
        <LoadingComponent />
    </div>
  
  );
};
