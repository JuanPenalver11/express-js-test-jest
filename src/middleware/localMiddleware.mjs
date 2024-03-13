 
 import { usersData } from "../userLocalData/userData.mjs";
 
 const findUserMiddleware = (request, response, next) =>{
    const { id } = request.params;
    const idParsed = parseInt(id);
    if (isNaN(idParsed)) {
      return response.status(400).send('ID needs to be a number');
    }
    const findUser = usersData.find((user) => user.id === idParsed);
    request.findUser = findUser
    next()
  }

  export default findUserMiddleware