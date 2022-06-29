import { Router } from "express";
import { createFamily, showFamilies } from "../controllers/family";

const router = Router();
router.get("/", showFamilies);

router.post("/new", createFamily);

export default router;
