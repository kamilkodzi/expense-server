const { Router } = require("express");
const router = Router();
const passport = require("passport");
const User = require("../models/User");

router.post("/login", passport.authenticate("local"), (req, res) => {
  // implements if authenticated and if not
  res.sendStatus(200);
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, password, email } = req.body;
  const newUser = await User.create({
    username: username,
    password: password,
    email: email,
  });
  console.log(newUser);
  res.status(200).send(newUser);
});

module.exports = router;
