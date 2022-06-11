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
    cookie: { maxAge: 300000 },
    resave: true,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send("Hello Gaming-server!");
});
app.use("/auth", authRoute);
app.use("/api", routes);

app.use(passport.initialize);
app.use(passport.session());

app.listen(3000, () => {
  console.log(`Server starts on port 3000`);
});
