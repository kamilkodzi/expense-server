import { Router } from "express";
import passport from "passport";
import { catchErr } from "../error/ErrorHandler";
import user from "../controllers/user";
const router = Router();

router.post("/login", passport.authenticate("local"), user.login);
router.post("/register", catchErr(user.create));

export default router;
