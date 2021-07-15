import { dbConfig } from '../config/dbConfig';
const Sequelize = require("sequelize");

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

class Db {
  public sequelize;
  public users;
  constructor() {
    this.sequelize = sequelize;
    this.users = require("./User")(sequelize, Sequelize);
  }
}

export const db = new Db();