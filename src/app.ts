import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import IController from './common/types/Controller';
import errorMiddleware from './common/middlewares/errorMiddleware';
import { NODE_ENV } from './config';

class App {
    public app: Express;
    public port: number;

    constructor(controllers: IController[], port: number) {
        this.app = express();
        this.port = port;

        if(NODE_ENV !== 'test') {
            this.connectToDatabase();
        }
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors({
            credentials: true
        }));
        this.app.use(cookieParser());
    }

    private initializeControllers(controllers: IController[]) {
        this.app.get('/', (req: Request, res: Response) => {
            return res.send('Hello World!');
        });
        controllers.forEach(controller => {
            this.app.use('/api', controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private connectToDatabase() {
        mongoose.connect('mongodb://localhost:27017/ts-chat');   
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        });
    }
}

export default App;