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

dbConnection().catch((err: any) => {
  //Will be moved to winston - maybe some day
  console.log(err);
});
const app: Express = express();
app.use(express.json());
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRoutes);
app.use("/families", isLogedIn, familyRoutes);

app.all("/*", (req, res, next) => {
  next(ExpressError.badRequest("Server could not understand your request"));
});
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  await errorHandler.handleError(err, res);
});
app.listen(3000, () => {
  //Will be moved to winston - maybe some day
  console.log(`Server is running...`);
});
