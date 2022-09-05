import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db';
import fs from 'fs';

function generateTokenAsync(id) {
  const payload = { id };
  const privateKey = fs.readFileSync('./src/private.key');

  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, { algorithm: 'RS256' }, function(err, token) { 
      if (err){
        reject(err)
        return
      }
      resolve(token)
    });
  })
}

class UserController {

  async registerUser(req, res){

    if(req.body){
      const DEFAULT_SALT = 7;
      const {userName, userEmail, userPassword} = req.body;
      
      const hashPassword = bcrypt.hashSync(userPassword, DEFAULT_SALT);
      const newUser = await db.query('INSERT INTO users (userName, userEmail, userPassword) values ($1, $2, $3) RETURNING *', [userName, userEmail, hashPassword])

      return res.json(newUser.rows[0]); 
    }
      return res.sendStatus(400);
  };

  async loginUser(req, res){

    const {userName, userPassword} = req.body;

    const user = await db.query('SELECT * FROM users WHERE userName = $1', [userName])

    if(!user){
      res.sendStatus(400).json('User do not registrated')
    }

    const validPassword = bcrypt.compareSync(userPassword, user.rows[0].userpassword)

    if (!validPassword) {
      return  res.json('Wrong password')
    } 

    generateTokenAsync(user.id)
      .then(token => res.json({ message:'User LogedIn', 
                                token }))
  };

  async getUsers(req, res){

    const users = await db.query('SELECT * FROM users');
    res.json(users.rows)
  }
}

export default new UserController;