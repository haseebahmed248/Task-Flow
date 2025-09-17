import { Sequelize } from "sequelize";
import { config } from "./database.js";


const sequelize = new Sequelize(config);

async function connectDB(){
    try {
        console.log('DB_USER:', process.env['DB_USER']);
        sequelize.authenticate();
        console.log('database connected successfully');
    } catch (error) {
        console.log('Database connection error', error);
        process.exit(1);
    }
}

export {sequelize, connectDB};