import UsersTable from "./service.Config";

class ServiceLayer{
  async registerDB(userName, userEmail, userPassword){
   const result = await UsersTable.create({ userName, userEmail, userPassword })
   return result
  }

  async loginDB(userName){
   const result = await UsersTable.findOne({ where: { userName } })
   return result
  }

  async usersDB(){
    const result = await UsersTable.findAll();
    return result
  }
}

export default new ServiceLayer;
