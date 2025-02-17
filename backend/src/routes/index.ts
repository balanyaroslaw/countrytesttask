import { Application } from 'express';
import CountryRouter from './country.router';

class AppRouter {
	private countryRouter:CountryRouter;
	constructor(private app: Application) {
		this.countryRouter = new CountryRouter();
	}
	init(): void {
		this.app.get('/', (_req, res) => {
			res.send('API Running');
		});

		this.app.use('/api', this.countryRouter.router);
	}
}

export default AppRouter;
