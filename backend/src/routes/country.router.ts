import { Router, Request, Response } from "express";
import countryController from "../controllers/country.controller";

class CountryRouter{
    public router:Router;

    constructor(){
        this.router = Router();
        this.initializeTodoRoutes();
    }

    private initializeTodoRoutes() {
        this.router.get('/all', (req: Request, res: Response) => countryController.getAll(res, req));
        
        this.router.get('/info/:code', (req: Request, res: Response) => countryController.getInfo(res, req));
    }
}

export default CountryRouter;