import dotenv from 'dotenv';
import express from "express";
import { pageRouter } from "../routes/routes";
import UserController from "../controller/user.controller";
import checkToken from '../middleware/middleware';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use('/', pageRouter);

app.set('views', './src/views')
app.set('view engine', 'pug');

app.post("/login", UserController.loginUser); 
app.post("/register", UserController.registerUser);
app.get("/users", checkToken, UserController.getUsers);

app.listen(PORT, () => {console.log('Server work', PORT)});


