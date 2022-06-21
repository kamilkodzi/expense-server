import { Express, NextFunction, Request, Response } from "express";
import IGetUserAuthInfoRequest from "./IGetUserAuthInfoRequest";

const routes = require("./routes/routes.js");
const dbConnection = require("./config/db");
const authRoute = require("./routes/auth");
const passport = require("passport");
const local = require("./strategies/local");
const session = require("express-session");
const cors = require("cors");
const express = require("express");

declare namespace Express {
  export interface Request {
    user: any;
  }
  export interface Response {
    user: any;
  }
}

dbConnection().catch((err: any) => console.log(err));
const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);
app.use(
  session({
    secret: "helloworld",
    cookie: { maxAge: 900000 },
    resave: true,
    saveUninitialized: false,
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello Gaming-server!");
});
app.use("/auth", authRoute);
app.use(
  "/api",
  (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    console.log("usr z esji" + req.user);
    if (req.user) {
      next();
    } else {
      res.status(403).send("unauthorized");
    }
  },
  routes
);

app.listen(3000, () => {
  console.log(`Server starts on port 3000`);
});
