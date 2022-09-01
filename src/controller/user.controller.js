import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import db from '../db';
import secret from '../config';


function generateToken(id) {
  const payload = {id};
  return jwt.sign(payload, secret, {expiresIn:'24h'})
}


class UserController {

  async registerUser(req, res){

    if(!req.body) {
      return res.sendStatus(400);
    } else {

      const {userName, userEmail, userPassword} = req.body;
      
      const hashPassword = bcrypt.hashSync(userPassword, 7);
      const newUser = await db.query('INSERT INTO users (userName, userEmail, userPassword) values ($1, $2, $3) RETURNING *', [userName, userEmail, hashPassword])

      res.json(newUser.rows[0]); 
    }
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

    const token = generateToken(user.id);

    return res.json({message:'User LogedIn', 
                    token:token });
  };

  async getUsers(req, res){

    const users = await db.query('SELECT * FROM users');
    res.json(users.rows)
  }
}

export default new UserController;