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
        dialect: (config.DBDIALECT as any) || 'mysql',
        port: config.DBPORT,
        dialectOptions: {
            ssl: false,
        },
        logging: true,
        models: Object.values(models),
    }
);

// const sequelize = new Sequelize({
//     dialect: 'mssql',
//     host: config.DBHOST,
//     port: config.DBPORT,
//     username: config.DBUSERNAME,
//     password: config.DBPASSWORD,
//     database: config.DBNAME,
//     models: Object.values(models),
//     dialectOptions: {
//         options: {
//             encrypt: true,
//             trustServerCertificate: false,
//         },
//     },
// });

sequelize.authenticate().then(() => {
    console.log('Database connection successful!.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export default sequelize;
