import { Response, Request } from 'express';
import CountryService from '../services/country.service';
interface ICountryController{
    getAll(res:Response, req:Request):Promise<void>,
    getInfo(res:Response, req:Request):Promise<void>
}

class CountryController implements ICountryController{

    constructor(private countryService:CountryService){}

    async getAll(res: Response, req: Request): Promise<void> {
        try {
            const countries = await this.countryService.getAllCountries();
            if (!countries) {
                res.status(500).json({ message: 'Failed to fetch countries' });
                return;
            }
            res.status(200).json(countries);
        } catch (error) {
            console.error('Error in getAllCountries:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getInfo(res: Response, req: Request): Promise<void> {
        const countryCode= req.params.code;

        if (!countryCode) {
            res.status(400).json({ message: 'Country code is required' });
            return;
        }

        try {
            const countryInfo = await this.countryService.getCountryByCode(countryCode.toUpperCase());

            if (!countryInfo) {
                res.status(404).json({ message: `Country with code ${countryCode} not found` });
                return;
            }

            res.status(200).json(countryInfo);
        } catch (error) {
            console.error('Error in getCountryByCode:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

    }
}

const countryController = new CountryController(new CountryService());

export default countryController;