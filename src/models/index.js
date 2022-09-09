import { Sequelize, DataTypes } from "sequelize";
import 'dotenv/config';

const DB = process.env.DB;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.HOST;


const sequelize = new Sequelize(DB_NAME, DB, DB_PASSWORD, {
  host: HOST,
  dialect: DB
});

const Users = sequelize.define(
  'Users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
    }, 
    email: DataTypes.STRING(40), 
    password:DataTypes.STRING
  }
)

export default Users;