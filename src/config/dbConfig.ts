require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DIALECT, DB_NAME } = process.env;

export const dbConfig = {
  HOST: DB_HOST,
  USER: DB_USERNAME,
  PASSWORD: DB_PASSWORD,
  DB: DB_NAME,
  dialect: DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
