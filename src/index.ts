import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/route';
import { db } from './models';

class Server {
    private app;
    public port = process.env.PORT || 3000;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
        this.start(Number(this.port));
    }

    private config() {
        this.app.use(bodyParser.json());
    }

    private dbConnect() {
        db.sequelize.sync();
    }

    private routerConfig() {
        this.app.use('/api/users', authRouter);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                console.log(`Server is running on ${port}`)
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

const server = new Server();
export default server;