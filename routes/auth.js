const { Router } = require("express");
const router = Router();
const passport = require("passport");
const User = require("../models/User");

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(200);
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const newUser = await User.create({ username: username, password: password });
  console.log(newUser);
  res.send(newUser);
});

module.exports = router;
