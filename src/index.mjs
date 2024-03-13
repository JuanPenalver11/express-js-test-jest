import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import mongoUserRoute from './routes/mongoUserRoute.mjs';
import localUserRoute from './routes/localUserRoute.mjs';

const app = express();

mongoose.connect('mongodb://localhost:27017/learning_jest')
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Database connection error:', err));

app.use(express.json());
app.use(cookieParser("holi"));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "iudwqhnn319dqhcn4q9fhw",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/learning_jest',
      autoRemove: 'native',
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(mongoUserRoute);
app.use(localUserRoute);

app.get("/", (request, response) => {
  response.send("Holi");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
