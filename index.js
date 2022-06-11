const express = require("express");
const routes = require("./routes/routes.js");
const dbConnection = require("./config/db");
const authRoute = require("./routes/auth");
const passport = require("passport");
const local = require("./strategies/local");
const session = require("express-session");

dbConnection().catch((err) => console.log(err));
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "helloworld",
    cookie: { maxAge: 900000 },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello Gaming-server!");
});
app.use("/auth", authRoute);
app.use(
  "/api",
  (req, res, next) => {
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
