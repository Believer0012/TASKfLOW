import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "taskFlow_task",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "2000",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    logging: false,
  }
);

export default sequelize;
