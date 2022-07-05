import { Router } from "express";
import FamilyControler from "../controllers/family";
import { catchErr } from "../error/ErrorHandler";
import {
  addFamily,
  setBudget,
  addExpense,
  editExpense,
} from "../validation/family";
import validate from "../validation/joiMiddleware";
import {
  isMemberOfHittedFamily,
  isOwnerOfExpense,
  notMemberOfHittedFamily,
} from "./authMiddleware";
const router = Router();

router
  .route("/")
  .get(catchErr(FamilyControler.showAll))
  .post(validate(addFamily), catchErr(FamilyControler.create));

router.get("/myfamily", validate(), catchErr(FamilyControler.myFamily));
router.get("/:id", validate(), catchErr(FamilyControler.showOne));

router.patch(
  "/:id/join",
  validate(),
  notMemberOfHittedFamily,
  catchErr(FamilyControler.join)
);

router.patch("/:id/quit", catchErr(FamilyControler.quit));

router.patch(
  "/:id/budget",
  validate(setBudget),
  catchErr(FamilyControler.setBudget)
);
router.patch(
  "/:id/user/:userId/becomehead",
  validate(),
  catchErr(FamilyControler.becomeHeadOfFamily)
);

router.post(
  "/:id/expenses",
  validate(addExpense),
  catchErr(FamilyControler.addExpense)
);

router.delete(
  "/:id/expenses/:expenseId",
  validate(),
  catchErr(FamilyControler.removeExpense)
);

router.patch(
  "/:id/expenses/:expenseId",
  validate(editExpense),
  isMemberOfHittedFamily,
  isOwnerOfExpense,
  catchErr(FamilyControler.editExpense)
);

export default router;
