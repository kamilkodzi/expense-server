import { Router } from "express";
import user from "../controllers/user";
import { catchErr } from "../error/ErrorHandler";
import validate from "../validation/joiMiddleware";
import { registerSchema } from "../validation/user";
const router = Router();

router.get("/myprofile/:id", catchErr(user.myProfile));
router.post(
  "/registerorlogin",
  validate(registerSchema),
  catchErr(user.createOrLogIn)
);
router.get("/:id", catchErr(user.userData));

export default router;
