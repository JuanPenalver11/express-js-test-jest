
import { validationResult, matchedData } from "express-validator";
import { hashPassword } from "../bcrypt/encrypted-password.mjs";
import { LocalUserModel } from "../moongose/localUserSchema/localUserModel.mjs";



export const newUserHandler =   async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).send(result.array());

    const data = matchedData(request);
    data.password = hashPassword(data.password);
    // const newUser = new LocalUserModel(data);
    // try {
    //   const savedUser = await newUser.save();
    //   response.status(201).send(savedUser);
    // } catch (err) {
    //   return response.sendStatus(400);
    // }
  }