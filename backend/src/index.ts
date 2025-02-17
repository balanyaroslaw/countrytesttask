import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AppRouter from './routes';
class Server{
	private port:number = 3030;
	private app: Express = express();
	private router:AppRouter;

	constructor(){
		this.port = 3030;
		this.app = express();

		this.app.use(cors({ origin: '*' }));

		this.app.use(express.json());
		this.app.use(bodyParser.json());
    	this.app.use(bodyParser.urlencoded({ extended: false }));

        this.router = new AppRouter(this.app);

        this.router.init();
	}

	public start(): void {
		this.app.listen(this.port, () => {
		  console.log(`Now listening on port ${this.port}`);
		});
	  }
}
const server = new Server();
server.start();