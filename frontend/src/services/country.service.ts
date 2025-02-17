import { TCountry, TCountryInfo } from "../types/country.type";
import { HttpService } from "./http.service";

class CountryService extends HttpService {
  constructor(apiUrl:string) {
    super(apiUrl); 
  }

  async getAllCountries(): Promise<TCountry[]> {
    const response = await this.get<TCountry[]>("/all");
    return response;
  }

  async getCountryInfo(code:string): Promise<TCountryInfo> {
    const response = await this.get<TCountryInfo>(`/info/${code}`);
    return response;
  }
}

const countryService = new CountryService(import.meta.env.VITE_BASE_URL);

export default countryService;