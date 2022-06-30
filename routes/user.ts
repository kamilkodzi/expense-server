import { Router } from "express";
import user from "../controllers/user";
import { catchErr } from "../error/ErrorHandler";
import { isLogedIn, isOwner } from "./authMiddleware";

const router = Router();

// router.get("/:id", isLogedIn, catchErr(user.userData));
// router.get("/family", isLogedIn, catchErr(user.familyData));
router.delete("/:id", isLogedIn, isOwner, catchErr(user.remove));

export default router;
