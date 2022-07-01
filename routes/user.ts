import { Router } from "express";
import passport from "passport";
import user from "../controllers/user";
import { catchErr } from "../error/ErrorHandler";
import { isLogedIn, isOwner } from "./authMiddleware";
import validate from "../validation/joiMiddleware";
import { loginSchema, registerSchema } from "../validation/user";
const router = Router();

router.post("/register", validate(registerSchema), catchErr(user.create));
router.get("/:id", isLogedIn, validate(), isOwner, catchErr(user.userData));
router.post(
  "/login",
  validate(loginSchema),
  passport.authenticate("local"),
  user.login
);
router.post("/logout", isLogedIn, user.logout);
router.delete("/:id", isLogedIn, isOwner, catchErr(user.remove));

export default router;
