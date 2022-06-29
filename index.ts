import { Express, NextFunction, Request, Response } from "express";
// import IGetUserAuthInfoRequest from "./IGetUserAuthInfoRequest";
import { ExpressError } from "./error/ExpressError";
import errorHandler, { asyncErrCatchWrapper } from "./error/ErrorHandler";
import passport from "passport";
import { corsConfig, dbConnection, sessionConfig } from "./appconfig";
import { isLogedIn } from "./routes/authMiddleware";

const routes = require("./routes/routes.js");
const authRoute = require("./routes/user");
const local = require("./strategies/local");
const session = require("express-session");
const cors = require("cors");
const express = require("express");

dbConnection().catch((err: any) => console.log(err));
const app: Express = express();
app.use(express.json());
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello in family expense platform!");
});
app.use("/user", authRoute);
app.use("/api", isLogedIn, routes);

app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  await errorHandler.handleError(err, res);
});

app.listen(3000, () => {
  console.log(`Server starts on port 3000`);
});
