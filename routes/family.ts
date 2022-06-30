import { Router } from "express";
import FamilyControler from "../controllers/family";
import { catchErr } from "../error/ErrorHandler";
import {
  isHeadOfFamily,
  isMemberOfHittedFamily,
  notMemberOfHittedFamily,
} from "./authMiddleware";

const router = Router();
router.get("/", catchErr(FamilyControler.showAll));
router.post("/", catchErr(FamilyControler.create));
router.get("/:id", catchErr(FamilyControler.showOne));
router.patch(
  "/:id/budget",
  isHeadOfFamily,
  catchErr(FamilyControler.setBudget)
);
router.patch(
  "/join/:id",
  notMemberOfHittedFamily,
  catchErr(FamilyControler.join)
);
router.patch(
  "/quit/:id",
  isMemberOfHittedFamily,
  catchErr(FamilyControler.quit)
);
router.patch(
  "/:id/budget",
  isMemberOfHittedFamily,
  catchErr(FamilyControler.quit)
);
router.post(
  "/:id/expenses",
  isMemberOfHittedFamily,
  catchErr(FamilyControler.addExpense)
);
router.delete(
  "/:id/expenses/:expenseId",
  isMemberOfHittedFamily,
  catchErr(FamilyControler.removeExpense)
);
router.patch(
  "/:id/expenses/:expenseId",
  isMemberOfHittedFamily,
  catchErr(FamilyControler.editExpense)
);

export default router;
