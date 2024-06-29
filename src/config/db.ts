import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
    models: [__dirname + '/../models/**/*.ts'],
    dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : { require: false },
    },
    logging: false
});

export default db;
