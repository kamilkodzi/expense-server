import { ExpressError } from "../error/ExpressError";
import Family, { IFamily } from "../models/Family";
import Expense, { IExpense } from "../models/Expense";
import User, { IUser } from "../models/User";
import { Document, HydratedDocument, Model, Query } from "mongoose";

class FamilyController {
  showAll = async (req, res) => {
    const results = await Family.find()
      .populate({
        path: "headOfFamily",
        select: ["firstName", "lastName"],
      })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(results);
  };

  showOne = async (req, res) => {
    const familyId = req.params.id;
    const results = await Family.findById(familyId)
      .populate({
        path: "headOfFamily",
        select: ["firstName", "lastName"],
      })
      .populate({
        path: "members",
        select: ["firstName", "lastName"],
      });

    res.status(200).json(results);
  };

  create = async (req, res) => {
    const { familyName } = req.body;
    const currentUserId = req.user._id;
    const user = await User.findById(currentUserId);
    if (user.family === null) {
      const newFamily: IFamily = {
        familyName: familyName,
        headOfFamily: currentUserId,
        members: [currentUserId],
      };
      const responseNewFamily = await Family.create(newFamily);
      user.family = currentUserId;
      user.save();
      res.status(201).json(responseNewFamily);
    } else {
      throw ExpressError.conflictWhileCreatingEntry(
        "Could not create new family, remove yourself from current family first"
      );
    }
    // implement adding family to the user itself - if no other is declared
    // or abord if user belong to any family
  };

  join = async (req, res) => {
    const familyId = req.params.id;
    const currentUserId = req.user._id;
    const user = await User.findById(currentUserId);
    const family = await Family.findById(familyId);
    if (!family.members.includes(currentUserId)) {
      family.members.push(currentUserId);
      user.family = currentUserId;
      family.save();
      user.save();
    }

    res.status(200).json({ message: "You joined the familly" });
  };

  quit = async (req, res) => {};

  removeFrom = async (req, res) => {};

  addTo = async (req, res) => {};

  addExpense = async (req, res) => {};

  removeExpense = async (req, res) => {};
}

const familyController = new FamilyController();
export default familyController;
