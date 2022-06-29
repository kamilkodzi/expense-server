import mongoose from "mongoose";

export const corsConfig = {
  origin: "http://localhost:8000",
};
export const sessionConfig = {
  secret: "helloworld",
  cookie: { maxAge: 900000 },
  resave: true,
  saveUninitialized: false,
};

export const dbConnection = async () => {
  await mongoose.connect("mongodb://localhost:27017/test");
};
