import axios from "axios";
import { TCountry, TCountryInfo } from "../types/country.type";

interface ICountryService{
    getAllCountries():Promise<TCountry[] | null>,
    getCountryByCode(code:string):Promise<TCountryInfo | null>,
}

class CountryService implements ICountryService{
    async getAllCountries(): Promise<TCountry[] | null> {
        try {
            const countriesRes = await axios.get(`https://date.nager.at/api/v3/AvailableCountries`);
            const countryData = countriesRes.data;
            return countryData;
        } 
        catch (error) {
            console.error('Error fetching all countries:', error);
            return null; 
        }
    }

    async getCountryByCode(code: string): Promise<TCountryInfo | null> {
        try {

            const countryInfoRes = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${code}`);
            const countryData = countryInfoRes.data;

            const populationRes = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
                country: countryData.commonName
            });
            const populationData = populationRes.data.data.populationCounts;

            const flagRes = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
                country: countryData.commonName
            });

            const flagURI = flagRes.data.data.flag;

            const countryInfo: TCountryInfo = {
                commonName: countryData.commonName,
                officialName: countryData.officialName,
                countryCode: countryData.countryCode,
                region: countryData.region,
                borders: countryData.borders ? countryData.borders.map((border: TCountryInfo) => ({
                    commonName: border.commonName,
                    officialName: border.officialName,
                    countryCode: border.countryCode,
                    region: border.region,
                    borders: null,
                    population: border.population,
                    flagURI: ''
                })) : null,
                population: populationData.map((pop: { year: number, value: number }) => ({
                    year: pop.year,
                    value: pop.value
                })),
                flagURI
            };

            return countryInfo;
        } catch (error) {
            console.error('Error fetching country info:', error);
            return null; 
        }
    }
}

export default CountryService;