const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(200);
});

module.exports = router;
