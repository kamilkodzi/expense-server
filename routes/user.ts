import { Router } from "express";
import passport from "passport";
import user from "../controllers/user";
import { catchErr } from "../error/ErrorHandler";
import { isLogedIn, isOwner } from "./authMiddleware";
import validate from "../validation/joiMiddleware";
import { loginSchema, registerSchema } from "../validation/user";
const router = Router();

router.get("/", isLogedIn, validate(), catchErr(user.getAllusers));
router.get("/loggedincheck", catchErr(user.isLoggedIn));
router.get("/myprofile", isLogedIn, catchErr(user.myProfile));
router.post(
  "/registerorlogin",
  validate(registerSchema),
  catchErr(user.createOrLogIn)
);
router.get("/:id", catchErr(user.userData));

router.delete("/:id", isLogedIn, isOwner, catchErr(user.remove));

export default router;
