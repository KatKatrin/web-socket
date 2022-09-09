import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userService from '../services/users.service.js';
import privateKey from '../privateKey.js';
import DEFAULT_SALT from '../config';


function generateToken(id) {
  const payload = { id };
  
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, { algorithm: 'RS256' }, function(err, token) { 
      if (err){
       return reject(err)
      }
      resolve(token)
    });
  })
}

function compareHash(password, originalPassword){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, originalPassword, (err, result) => {
      if (err){
        return reject(err)
      }
      resolve(result)
      })
  })
}

class UserController {

  async registerUser(req, res){
    if(req.body){
      const { name, email, password } = req.body;
      const hashPassword = bcrypt.hashSync(password, DEFAULT_SALT);
      const newUser = await userService.saveUser(name, email, hashPassword);
      
      return res.json(newUser); 
    }
      return res.sendStatus(400);
  };

  async loginUser(req, res){
    const { name, password } = req.body;
    const user = await userService.login(name)
    if (!user){
     return res.status(400).json({ result: 'User do not registered' })
    }

    const validPassword = await compareHash(password, user.password)

    if (!validPassword) {
      return  res.status(400).json({ error: "Wrong password" })
    } 

    const token = await generateToken(user.id);

    res.json({ message:'User LogedIn', 
               token })
  };

  async getUsers(req, res){
    const users = await userService.findAll();
    res.json(users)
  }
}

export default new UserController;