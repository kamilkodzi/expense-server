import mongoose from "mongoose";
const MongoStore = require("connect-mongo");
const secret = process.env.SECRET || "--ThisShouldBeASecretKey--";
const dbUrl = process.env.DBURL || "mongodb://localhost:27017/family_expenses";
const corsUrl = process.env.CORSURL || "http://localhost:8000";

export const corsConfig = {
  origin: corsUrl,
  credentials: true,
};

mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection open");
});
mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

export const dbConnection = async () => {
  await mongoose.connect(dbUrl);
};
