import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ServiceLayer from '../services/service.Layer';
import privateKey from '../privateKey.js';
import DEFAULT_SALT from '../config';


function generateTokenAsync(id) {
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

class UserController {

  async registerUser(req, res){
    if(req.body){
      const {userName, userEmail, userPassword} = req.body;
      const hashPassword = bcrypt.hashSync(userPassword, DEFAULT_SALT);
      const newUser = await ServiceLayer.registerDB(userName, userEmail, hashPassword);
      
      return res.json(newUser); 
    }
      return res.sendStatus(400);
  };

  async loginUser(req, res){
    const {userName, userPassword} = req.body;
    const user = await ServiceLayer.loginDB(userName)
    if(!user){
     return res.sendStatus(400).json('User do not registrated')
    }

    const validPassword = bcrypt.compareSync(userPassword, user.userPassword)

    if (!validPassword) {
      return  res.sendStatus(400).json('Wrong password')
    } 

    const token = await generateTokenAsync(user.id);

    res.json({ message:'User LogedIn', 
               token })
  };

  async getUsers(req, res){
    const users = await ServiceLayer.usersDB();
    res.json(users)
  }
}

export default new UserController;