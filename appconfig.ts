import { SessionOptions } from "express-session";
import mongoose from "mongoose";
const MongoStore = require("connect-mongo");
const secret = process.env.SECRET || "--ThisShouldBeASecretKey--";
const dbUrl = process.env.DBURL || "mongodb://localhost:27017/family_expenses";
const corsUrl = process.env.CORSURL || "http://localhost:8000";

const store = new MongoStore({
  mongoUrl: dbUrl,
  secret: secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("Session store error", e);
});

export const corsConfig = {
  origin: ["https://family-expense.netlify.app", "http://localhost:8000"],
  credentials: true,
};

export const sessionConfig: SessionOptions = {
  store,
  secret,
  cookie: {
    maxAge: 900000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  },
  resave: true,
  saveUninitialized: true,
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", function () {
  //Will be moved to winston - maybe some day
  console.log("Mongoose default connection open");
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  //Will be moved to winston - maybe some day
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  //Will be moved to winston - maybe some day
  console.log("Mongoose default connection disconnected");
});

export const dbConnection = async () => {
  await mongoose.connect(dbUrl);
};
