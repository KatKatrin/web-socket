import Users from "../models"

class UserService{
  saveUser(name, email, password){
   return Users.create({ name, email, password })
  }

  login(name){
   return Users.findOne({ where: { name } })
  }

  findAll(){
    return Users.findAll();
  }
}

export default new UserService;