if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import "./strategies/local";
import express, { Express, NextFunction, Request, Response } from "express";
import { ExpressError } from "./error/ExpressError";
import errorHandler from "./error/ErrorHandler";
import passport from "passport";
import { corsConfig, dbConnection, sessionConfig } from "./appconfig";
import { isLogedIn } from "./routes/authMiddleware";
import familyRoutes from "./routes/family";
import userRoutes from "./routes/user";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import { basename } from "path";

dbConnection().catch((err: any) => {
  //Will be moved to winston - maybe some day
  console.log(err);
});

const app: Express = express();
app.use(helmet());
app.use(express.json());
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// // Add headers before the routes are defined
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.cookie("bsaSession", req.session.id, { httpOnly: false });

//   // Request methods you wish to allow
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
//   );

//   // Request headers you wish to allow
//   res.header(
//     "Access-Control-Allow-Headers",
//     "access-control-allow-origin,content-type,set-cookie"
//   );
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://family-expense.netlify.app"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)

//   res.header("Access-Control-Allow-Credentials", "true");

//   // Pass to next layer of middleware
//   next();
// });

app.use("/user", userRoutes);
app.use("/families", isLogedIn, familyRoutes);
app.all("/*", (req, res, next) => {
  next(ExpressError.badRequest("Server could not understand your request"));
});
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  await errorHandler.handleError(err, res);
});

process.on("unhandledRejection", (reason) => {
  //Will be moved to winston - maybe some day
  console.log("unhandledRejection = ", reason);
});
process.on("uncaughtException", (error: Error) => {
  //Will be moved to winston - maybe some day
  console.log("Sorrry we have uncaughtException = ", error);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const env = app.get("env");
  console.log(`Server is running... in ${env} mode`);
});
