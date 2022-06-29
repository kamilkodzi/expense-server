const { Router } = require("express");
const router = Router();
const passport = require("passport");
import { asyncErrCatchWrapper } from "../error/ErrorHandler";
import { ExpressError } from "../error/ExpressError";
import User from "../models/User";

router.post("/login", passport.authenticate("local"), (req, res) => {
  // implements if authenticated and if not
  res.sendStatus(200);
});

router.post(
  "/register",
  asyncErrCatchWrapper(async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const user = new User({ email: email, username: username });
      const newUser = await User.register(user, password);
      res.status(200).send(newUser);
    } catch (error) {
      console.log("mamy erora");
      throw ExpressError.couldNotStoreInDatabase(error.message);
    }
  })
);

module.exports = router;
