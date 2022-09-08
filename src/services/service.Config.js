import { Sequelize, DataTypes } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const DB = process.env.DB;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.HOST;

const sequelize = new Sequelize(DB_NAME, DB, DB_PASSWORD, {
  host: HOST,
  dialect: DB
});

const UsersTable = sequelize.define(
  'UsersTable',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName:{
      type: DataTypes.STRING,
    }, 
    userEmail: DataTypes.STRING(40), 
    userPassword:DataTypes.STRING
  }
)

export default UsersTable;