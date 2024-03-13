
export const getUserByIdHandler = (request, response) => {
    if(!request.user) return response.sendStatus(418)
    const {findUser} = request
  response.status(200).send(findUser)
  }