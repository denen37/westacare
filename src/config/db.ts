import { Sequelize } from "sequelize-typescript";
import config from "./configSetup";
import * as models from "../models/Models"

const env = process.env.NODE_ENV || "development";
const dbConfig = (config as any)[env];

const sequelize = new Sequelize(
    config.DBNAME || 'test',
    config.DBUSERNAME || 'root',
    config.DBPASSWORD,
    {
        host: config.DBHOST,
        dialect: 'mysql',
        dialectOptions: {
            ssl: false,
        },
        logging: false,
        models: Object.values(models),
    }
);

sequelize.authenticate().then(() => {
    console.log('Database connection successful!.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export default sequelize;
