//Do not remove * as local - it's required by passport :)
import "./strategies/local";
import { Express, NextFunction, Request, Response } from "express";
import { ExpressError } from "./error/ExpressError";
import errorHandler from "./error/ErrorHandler";
import passport from "passport";
import { corsConfig, dbConnection, sessionConfig } from "./appconfig";
import { isLogedIn } from "./routes/authMiddleware";
import familyRoutes from "./routes/family";
import login from "./routes/login";
import userRoutes from "./routes/user";
// const user = require("./routes/user");

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

app.use("/", login);
app.use("/user", isLogedIn, userRoutes);
app.use("/families", isLogedIn, familyRoutes);

app.all("/*", (req, res, next) => {
  next(ExpressError.badRequest("Server could not understand your request"));
});

app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  await errorHandler.handleError(err, res);
});

app.listen(3000, () => {
  console.log(`Server starts on port 3000`);
});
