import { Router } from "express";
import FamilyControler from "../controllers/family";
import { asyncErrCatchWrapper } from "../error/ErrorHandler";

const router = Router();
router.get("/", asyncErrCatchWrapper(FamilyControler.showAll));
router.post("/", asyncErrCatchWrapper(FamilyControler.create));
router.get("/:id", asyncErrCatchWrapper(FamilyControler.showOne));
router.patch("/join/:id", asyncErrCatchWrapper(FamilyControler.join));

export default router;
