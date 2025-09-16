import dotenv from 'dotenv';
dotenv.config();
import type {Options} from 'sequelize';

const config: Options = {
    dialect: 'postgres',
    host: process.env['DB_HOST'] || 'localhost',
    port: parseInt(process.env['DB_PORT'] || '5432', 10),
    database: process.env['DB_NAME'] || 'database',
    username: process.env['DB_USER'] || 'user',
    password: process.env['DB_PASSWORD'] || 'password',
    logging: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, //max time to acquire a connection in ms
        idle: 10000,  // max time for a connection to stay idle
    }
}

export {config};