import { Router } from "express";
import passport from "passport";
import user from "../controllers/user";
import { catchErr } from "../error/ErrorHandler";
import { isLogedIn, isOwner } from "./authMiddleware";
const router = Router();

router.get("/", isLogedIn, catchErr(user.userData));
router.post("/register", catchErr(user.create));
router.post("/login", passport.authenticate("local"), user.login);
router.delete("/:id", isLogedIn, isOwner, catchErr(user.remove));

// router.get("/family", isLogedIn, catchErr(user.familyData));

export default router;
