import express, { request, response } from "express";

import { pageRouter } from "../routes/routes";
import UserController from "../controller/user.controller";
import checkToken from '../middleware/middleware';

const app = express();

const urlencodedParser = express.urlencoded({extended: false});

const HOST = '127.0.0.1';
const PORT = 3000;

app.use(express.json());
app.use('/', pageRouter);

app.set('views', './src/views')
app.set('view engine', 'pug');


app.post("/login", UserController.loginUser); 

app.post("/register", UserController.registerUser);

app.get("/users", checkToken, UserController.getUsers);


app.listen(PORT, HOST, () => {console.log('Server work')});

