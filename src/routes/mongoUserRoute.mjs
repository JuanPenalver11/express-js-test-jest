import { Router } from "express";
import { localUserValidator } from "../validator/localUserValidator.mjs";
import { checkSchema } from "express-validator";
import passport from "passport";
import { newUserHandler } from "../handlers/mongoHandlers.mjs";
import '../strategies/mongo-strategies.mjs'

const route = Router();

route.post(
  "/api/createUser",
  checkSchema(localUserValidator),
  newUserHandler
);

route.get("/api/userStatus", (request, response) => {
  if (!request.user) response.status(404).send("User not found");
  response.status(200).send(request.user);
});

route.post("/api/logout", (request, response) => {
  if (!request.user) response.sendStatus(401);
  request.logOut((err) => {
    if (err) {
      return response.status(401).send(err);
    } else {
        return response.status(200).send('logged out')
    }
  });
});

route.post("/api/login", passport.authenticate('local'),(request,response)=>{
    response.sendStatus(200)
})

export default route;
