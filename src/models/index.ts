import { Sequelize } from "sequelize";
import config from "../config/db"; // Import config

const env = process.env.NODE_ENV || "development";
const dbConfig = (config as any)[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  }
);

sequelize.authenticate().then(() => {
  console.log('Database connection successful!.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

export default sequelize;
