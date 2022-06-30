import { ExpressError } from "../error/ExpressError";
import Family, { IFamily } from "../models/Family";
import Expense, { IExpense } from "../models/Expense";
import User, { IUser } from "../models/User";
import { Document, HydratedDocument, Model, ObjectId, Query } from "mongoose";

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

  showMyFamily = async (req, res) => {
    const currentUserId = req.user._id;
    const userFamily = await User.findById(currentUserId);
    if (userFamily.family) {
      const family = await Family.findById(userFamily.family)
        .populate({
          path: "headOfFamily",
          select: ["firstName", "lastName", "username"],
        })
        .populate({
          path: "members",
          select: ["firstName", "lastName", "username"],
        });
      res.status(200).json(family);
    } else {
      res
        .status(200)
        .json({ message: "You have no family - please join any." });
    }
  };

  create = async (req, res) => {
    const { familyName } = req.body;
    const currentUserId = req.user._id;
    const user = await User.findById(currentUserId);

    if (user.family === null) {
      const newFamily = new Family({
        familyName: familyName,
        headOfFamily: currentUserId,
        members: [currentUserId],
      });
      //@ts-ignore
      user.family = newFamily;
      await newFamily.save();
      await user.save();
      res.status(201).json({ message: "Great!, You've created new family" });
    } else {
      throw ExpressError.conflictWhileCreatingEntry(
        "Could not create new family, remove yourself from current family first"
      );
    }
  };

  join = async (req, res) => {
    const familyId = req.params.id;
    const currentUserId = req.user._id;
    const user = await User.findById(currentUserId);
    const family = await Family.findById(familyId);
    family.members.push(currentUserId);
    user.family = familyId;
    family.save();
    user.save();
    res.status(200).json({ message: "You've joined the family" });
  };

  quit = async (req, res) => {
    const familyId: ObjectId = req.params.id;
    const currentUserId = req.user._id;
    const user = await User.findById(currentUserId);

    await Family.findByIdAndUpdate(familyId, {
      $pull: { members: currentUserId },
    });
    user.family = null;
    user.save();
    res.status(200).json({ message: "You've quit the family" });
  };

  addExpense = async (req, res) => {};

  removeExpense = async (req, res) => {};

  setBudget = async (req, res) => {
    const { budgetValue } = req.body;
    const { id } = req.params;
    const family = await Family.findById(id);
    //@ts-ignore
    if (family?.headOfFamily.equals(req.user.id)) {
      family.budget = budgetValue;
      family.save();
      res.status(200).json({ message: "You've changed baudget" });
    } else {
      throw ExpressError.unAuthorized("You have no permisstion to change");
    }
  };
}

const familyController = new FamilyController();
export default familyController;
