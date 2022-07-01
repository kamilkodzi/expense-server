import { Router } from "express";
import passport from "passport";
import user from "../controllers/user";
import { catchErr } from "../error/ErrorHandler";
import { isLogedIn, isOwner } from "./authMiddleware";
import validate from "../validation/joiMiddleware";
import { loginSchema, registerSchema } from "../validation/user";
const router = Router();

router.get("/:id", validate(), isLogedIn, isOwner, catchErr(user.userData));
router.post("/register", validate(registerSchema), catchErr(user.create));
router.post(
  "/login",
  validate(loginSchema),
  passport.authenticate("local"),
  user.login
);
router.delete("/:id", isLogedIn, isOwner, catchErr(user.remove));

export default router;
