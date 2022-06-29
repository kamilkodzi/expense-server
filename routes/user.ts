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
      const { username, password, firstName, lastName } = req.body;
      const user = new User({ username, firstName, lastName });
      const newUser = await User.register(user, password);
      res.status(200).json({
        message: "User created",
        data: {
          fistrName: newUser.firstName,
          lastName: newUser.lastName,
        },
      });
    } catch (error) {
      throw ExpressError.couldNotStoreInDatabase(error.message);
    }
  })
);

module.exports = router;
