import express from 'express';
import { connectDB, sequelize } from './config/sequelize.js';
import dotenv from 'dotenv'
import { ConnectionError, DatabaseError } from 'sequelize';


class App{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.setConfig();
        this.setupRoutes();
    }

    private setConfig(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        dotenv.config();
    }

    setupRoutes(): void{
        this.app.use('/',(_req, res)=>{
            res.json("Hello world")
        })
        this.app.use('/health-check', async(_req,res)=>{
            try{
                await sequelize.query('SELECT 1');
                res.status(201).json({status: 'ok', db: 'connected'});
            }catch(err: unknown){
                if (err instanceof ConnectionError) {
                    res.status(500).json({ status: "error", db: "connection failed" });
                } else if (err instanceof DatabaseError) {
                    res.status(500).json({ status: "error", db: "query failed" });
                } else if (err instanceof Error) {
                    res.status(500).json({ status: "error", db: "disconnected", message: err.message });
                } else {
                    res.status(500).json({ status: "error", db: "unknown issue" });
                }
            }
        })
    }

    async startServer(port: number): Promise<void> {
        await connectDB();
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
const app = new App().startServer(7000);
export { app };