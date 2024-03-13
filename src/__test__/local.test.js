// este documento es el que va a llevar los test sobre la ruta local
// la gracia de jest es que se configura de forma global.
// sin embargo se puede dar el caso de que no este configurado.
// para ello debes crear un documento llamada jsconfig.json
import validator from 'express-validator'
//como estamos usando functiones del paquete express-validator es importante llamar a validator 
//para luego poder extraer las funciones en el test 
import encryptedpassword from "../bcrypt/encrypted-password.mjs"
import { getUserByIdHandler } from "../handlers/localHandlers.mjs";
import { newUserHandler } from "../handlers/mongoHandlers.mjs";


//este codigo de qui es necesario porque en newUserHandle estamos usando funciones del paquete express-validator 
//import { validationResult, matchedData } from "express-validator";
// para que el test funcione todo tiene que ser indicado
jest.mock('express-validator', ()=>({
  validationResult: jest.fn(()=>({
    isEmpty:jest.fn(()=>false),
    array:jest.fn(()=>[{msg: "Invalid Field"}])
  })),
  matchedData: jest.fn(()=>({
    username:"test",
    password:"password"
  }))
}))

e


jest.mock('../bcrypte/encrypted-password.mjs', ()=>({
hashPassword: jest.fn((password)=>`hashed_${password}`),
}))

// ///////////////////////////////////////////////////////////////////////////////////////////
//pasamos getUSerByIdHandler para testear si funciona

// export const getUserByIdHandler = (request, response) => {
//     if(!request.user) return response.sendStatus(500)
//     const {findUser} = request
//   console.log(findUser)
//   response.status(200).send(findUser)
//   }

//mockRequest lo que va a hacer es verificar que el reques en este caso findUser cumple con su cometido y devuelve un objeto
//con el id, username y password del usuario.

// const mockRequest = {
//   findUser: 3,

//   //
// };

//mockResponse va a asegurase de la ques respuestas en este caso sendStatus500 y send(findUser) funcionan
const mockResponse = {
  sendStatus: jest.fn(),
  //jest.fn va a crear una funcion que comprobara si
  send: jest.fn(),
  status: jest.fn(() => mockResponse),
};

// // esto de arriba es falsa informacion que le vamos a pasar a getUserByIdHandler

// describe("get user", () => {
//   it("should get user by id", () => {
//     //puedes tanto poner test como it
//     getUserByIdHandler(mockRequest, mockResponse);
//     //llamamos a la funcion y le pasamos los datos falsos como argumentos - para ejecutar el test npm run test
//     expect(mockResponse.send).toBeDefined();
//     // esto se utiliza para indicar que esperar que sucede y comprobar que se cumple
//     // en este caso queremos que mockResponse 'send(findUser)' haya sido enviado y definido
//     expect(mockResponse.send).toHaveBeenCalledWith({
//       id: 1,
//       username: "Pepe",
//       password: "12345678",
//     });
//     expect(mockResponse.send).toHaveBeenCalledTimes(1);
//   });
//   //todo aparece como fail ... no entiendo como corregirlo
// });

describe("create user", () => {
  const mockRequest = {};

  it("should return status of 400 when there are errors", async() => {
    await newUserHandler (mockRequest, mockResponse)
    expect(validator.validationResult).toHaveBeenCalled();
    //se llama a validator para extraer validationResult
    expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith([{msg: "Invalid Field"}])
  });

  it("should return status 201 and user created", async ()=>{
    jest.spyOn(validator, "validationResult").mockImplementationOnce(()=>({
      isEmpty: jest.fn(()=>true),
    }))
    await newUserHandler(mockRequest, mockResponse);
    expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
    //se llama a validator para extraer a matchedData
    expect(encryptedpassword.hashPassword).toHaveBeenCalledWith('password');
    expect(encryptedpassword.hashPassword).toHaveReturnedWith('hashed_password');
  })
});
