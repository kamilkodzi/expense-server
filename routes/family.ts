import { Router } from "express";
import Family, { IFamily } from "../models/Family";

const router = Router();
router.get("/test", (req, res) => {
  res.sendStatus(200);
});

router.post("/create", async (req, res) => {
  const { familyName } = req.body;
  const newFamily: IFamily = {
    familyName: familyName,
    headOfFamily: "sdsds",
    members: [],
  };
  Family.create();

  res.status(200).send("koniec");
});

module.exports = router;
