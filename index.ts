import express, { Express, NextFunction, Request, Response } from "express";
import { ExpressError } from "./error/ExpressError";
import errorHandler from "./error/ErrorHandler";
import { corsConfig, dbConnection } from "./appconfig";
import familyRoutes from "./routes/family";
import userRoutes from "./routes/user";
import cors from "cors";
import helmet from "helmet";

dbConnection().catch((err: any) => {
  console.log(err);
});

const app: Express = express();
app.use(helmet());
app.use(express.json());
app.use(cors(corsConfig));

app.use("/user", userRoutes);
app.use("/families", familyRoutes);
app.all("/*", (req, res, next) => {
  next(ExpressError.badRequest("Server could not understand your request"));
});
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  await errorHandler.handleError(err, res);
});

process.on("unhandledRejection", (reason) => {
  console.log("unhandledRejection = ", reason);
});
process.on("uncaughtException", (error: Error) => {
  console.log("Sorrry we have uncaughtException = ", error);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const env = app.get("env");
  console.log(`Server is running... in ${env} mode`);
});
