const { Router } = require("express");
const router = Router();
const passport = require("passport");
import FamilyControler from "../controllers/family";
import { asyncErrCatchWrapper } from "../error/ErrorHandler";
import { ExpressError } from "../error/ExpressError";
import User from "../models/User";
import { isLogedIn, isOwner } from "./authMiddleware";

router.get("/shakehand", async (req, res) => {
  const currentUserId = req.user?._id;
  if (currentUserId) {
    const user = await User.findById(currentUserId);
    res.status(200).json(user);
  } else {
    res.status(400).send("no user found, log in first");
  }
});

router.get(
  "/myfamily",
  isLogedIn,
  asyncErrCatchWrapper(FamilyControler.showMyFamily)
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Welcome back !" });
});

router.delete(
  "/:id",
  isLogedIn,
  isOwner,
  asyncErrCatchWrapper(async (req, res, next) => {
    console.log("inside remove route");
    const userToRemove = req.params.id;
    await User.deleteOne({ _id: userToRemove });
    res.status(200).json({ message: "User removed" });
  })
);

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
