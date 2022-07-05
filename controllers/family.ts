import { ExpressError } from "../error/ExpressError";
import Family from "../models/Family";
import Expense from "../models/Expense";
import User from "../models/User";

class FamilyController {
  myFamily = async (req, res) => {
    const results = await Family.find({ headOfFamily: req.user.id })
      .populate({
        path: "headOfFamily",
        select: ["firstName", "lastName"],
      })
      .populate({
        path: "members",
        select: ["firstName", "lastName"],
      })
      .populate({
        path: "expenses",
      });
    res.status(200).json(results);
  };

  showAll = async (req, res) => {
    const results = await Family.find()
      .populate({
        path: "headOfFamily",
        select: ["username"],
      })
      .sort({ createdAt: -1 });
    res.status(200).json(results);
  };

  showOne = async (req, res) => {
    const { id } = req.params;
    const results = await Family.findById(id)
      .populate({
        path: "headOfFamily",
        select: ["firstName", "lastName"],
      })
      .populate({
        path: "members",
        select: ["firstName", "lastName"],
      })
      .populate({
        path: "expenses",
      });
    if (results) {
      res.status(200).json(results);
    } else {
      throw ExpressError.badRequest("No family with given id");
    }
  };

  create = async (req, res) => {
    const { familyName, headOfFamily } = req.body;
    const user = await User.findById(headOfFamily);

    if (user.family === null) {
      const newFamily = new Family({
        familyName: familyName,
        headOfFamily: headOfFamily,
        members: [headOfFamily],
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
    const { id } = req.params;
    const user = await User.findById(req.body.id);
    if (user?.family) {
      throw ExpressError.conflictWhileCreatingEntry(
        "You have family already, please leave current one firs"
      );
    } else {
      const family = await Family.findById(id);
      family.members.push(req.body.id);
      user.family = id;
      family.save();
      user.save();
      res.status(200).json({ message: "You've joined the family" });
    }
  };

  quit = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.body.id);
    const family = await Family.findById(id);
    //@ts-ignore
    if (family?.headOfFamily && family?.headOfFamily.equals(req.body.id)) {
      await Family.findByIdAndUpdate(id, {
        $pull: { members: req.body.id },
        headOfFamily: null,
      });
      user.family = null;
      user.save();
      res.status(200).json({ message: "You've quit the family" });
    } else {
      await Family.findByIdAndUpdate(id, {
        $pull: { members: req.body.id },
      });
      user.family = null;
      user.save();
      res.status(200).json({ message: "You've quit the family" });
    }
  };

  addExpense = async (req, res) => {
    const { id } = req.params;
    const { value, name, author, familyID } = req.body;
    const expenseObj = new Expense({
      name,
      value,
      author,
      family: id,
    });

    const expenses = await Expense.find({ family: id });
    const family = await Family.findById(id);
    const sumOfExpenses = expenses.map((i) => {});

    if (expenses.length > 0) {
      const sum =
        expenses.map((item) => item?.value).reduce((a, b) => a + b) +
        Number(value);

      if (sum > family?.budget) {
        throw ExpressError.couldNotStoreInDatabase("It`s above your budget :(");
      }
    } else {
      if (value > family?.budget) {
        throw ExpressError.couldNotStoreInDatabase("It`s above your budget :(");
      }
    }

    //@ts-ignore
    family.expenses.push(expenseObj);
    await family.save();
    await expenseObj.save();
    res.status(200).json({ message: "You've added expense" });
  };

  removeExpense = async (req, res) => {
    const { id, expenseId } = req.params;
    await Family.findByIdAndUpdate(id, { $pull: { expenses: expenseId } });
    await Expense.findByIdAndDelete(expenseId);
    res.status(200).json({ message: "You removed expense" });
  };

  editExpense = async (req, res) => {
    const { expenseId } = req.params;
    const { value, name } = req.body;
    const result = await Expense.findByIdAndUpdate(expenseId, { value, name });
    console.log(result);
    res.status(200).send("You've updated expense");
  };

  setBudget = async (req, res) => {
    const { value } = req.body;
    const { id } = req.params;
    const family = await Family.findById(id);
    family.budget = value;
    family.save();
    res.status(200).json({ message: "You've changed the budget" });
  };

  becomeHeadOfFamily = async (req, res) => {
    const { id, userId } = req.params;
    const checkIfNull = await Family.findById(id);

    if (!checkIfNull.headOfFamily) {
      const result = await Family.findByIdAndUpdate(id, {
        headOfFamily: userId,
      });
      res.status(200).json({ message: "You are head of family" });
    } else {
      throw ExpressError.couldNotStoreInDatabase(
        "Someone other is head of family now"
      );
    }
  };
}

const familyController = new FamilyController();
export default familyController;
