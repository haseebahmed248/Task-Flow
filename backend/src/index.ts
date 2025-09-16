import express from 'express';


class App{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.setConfig();
        this.setupRoutes();
        this.startServer(7000);
    }

    private setConfig(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    setupRoutes(): void{
        this.app.use('/',(_req, res)=>{
            res.json("Hello world")
        })
    }

    startServer(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
const app = new App().app;
export { app };