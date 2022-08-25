import express, { request, response } from "express";


const app = express();

const urlencodedParser = express.urlencoded({extended: false});

const HOST = '127.0.0.1';
const PORT = 3000;

let users = [];

app.set('view engine', 'pug');


app.get('/signup', (req, res) => {

  res.render('form', {
    signUp: true,
  })
})

app.get('/signin', (req, res) => {

  res.render('form', {
    signUp: false,
  })
})

app.get('/', (req, res) => {

  res.render('form', {
    mainPage: true,
  })
})


app.post("/sendData", urlencodedParser, function (request, response) {
  if(!request.body) return response.sendStatus(400);
  users.push(request.body)
  console.log(request.body);
  response.send(`${request.body.userEmail} - ${request.body.password}`);
});

app.get("/sendData", function (request, response) {
    
  response.send(users);
});

app.listen(PORT, HOST, () => {console.log('Server work')});

