import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { localUserValidator } from "../validator/localUserValidator.mjs";
import { usersData } from "../userLocalData/userData.mjs";
import passport from "passport";
// import '../strategies/local-strategies.mjs'
import findUserMiddleware from "../middleware/localMiddleware.mjs";
import {getUserByIdHandler} from "../handlers/localHandlers.mjs"

const route = Router();

route.post('/api/local/login', passport.authenticate('local'), (request, response) => {
    response.status(200).send();
});

route.post(
    "/api/local/newUser",
    checkSchema(localUserValidator),
    (request, response) => {
        const result = validationResult(request);
        if (!result.isEmpty()) return response.status(400).send(result.array());
        const data = matchedData(request);
        const newId = Math.floor(Math.random() * 3000);
        const newUser = { id: newId, ...data };
        usersData.push(newUser);
        response.status(200).send(newUser);
    }
);

route.get("/api/local/users", (request, response) => {
  if(!request.user) return response.status(401).send("Unauthorized");
  return response.status(200).send(usersData);
});

route.get('/api/local/:id', findUserMiddleware, getUserByIdHandler);
//getUserByIdHandler se ha convertido en una funcion que se puede exportar para poder ser testeada. local.test.js

route.post("/api/local/logout", (request, response) => {
    if (!request.user) return response.sendStatus(401);
    request.logOut((err) => {
        if (err) {
            return response.sendStatus(500); 
        } else {
            return response.status(200).send("logged out");
        }
    });
});

export default route;
