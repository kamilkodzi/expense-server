import { Router } from "express";
import FamilyControler from "../controllers/family";
import { asyncErrCatchWrapper } from "../error/ErrorHandler";
import {
  isMemberOfHittedFamily,
  notMemberOfHittedFamily,
} from "./authMiddleware";

const router = Router();
router.get("/", asyncErrCatchWrapper(FamilyControler.showAll));
router.post("/", asyncErrCatchWrapper(FamilyControler.create));
router.get("/:id", asyncErrCatchWrapper(FamilyControler.showOne));
router.patch("/:id/budget", asyncErrCatchWrapper(FamilyControler.setBudget));
router.patch(
  "/join/:id",
  notMemberOfHittedFamily,
  asyncErrCatchWrapper(FamilyControler.join)
);
router.patch(
  "/quit/:id",
  isMemberOfHittedFamily,
  asyncErrCatchWrapper(FamilyControler.quit)
);

export default router;
