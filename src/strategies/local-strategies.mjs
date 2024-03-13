import passport from "passport";
import  { usersData }  from "../userLocalData/userData.mjs";
import { Strategy } from "passport-local";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const findUser = usersData.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    try {
      const findUser = usersData.find((user) => user.username === username);
      console.log(findUser)
      if (!findUser) throw new Error("User not found");
      if (password !== findUser.password) throw new Error("Invalid password");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);

