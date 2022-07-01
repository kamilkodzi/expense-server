import mongoose from "mongoose";
const MongoStore = require("connect-mongo");
const secret = process.env.SECRET || "--ThisShouldBeASecretKey--";
const dbUrl = process.env.DBURL || "mongodb://localhost:27017/test";
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
  origin: corsUrl,
};

export const sessionConfig = {
  store,
  secret: secret,
  cookie: { maxAge: 900000 },
  resave: true,
  saveUninitialized: false,
};

export const dbConnection = async () => {
  await mongoose.connect(dbUrl);
};
