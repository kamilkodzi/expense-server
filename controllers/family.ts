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
        select: ["firstName", "lastName"],
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
    const { familyName } = req.body;
    const user = await User.findById(req.user.id);

    if (user.family === null) {
      const newFamily = new Family({
        familyName: familyName,
        headOfFamily: req.user.id,
        members: [req.user.id],
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
    const user = await User.findById(req.user.id);
    if (user.family) {
      throw ExpressError.conflictWhileCreatingEntry(
        "You have family already, please leave current one firs"
      );
    } else {
      const family = await Family.findById(id);
      family.members.push(req.user.id);
      user.family = id;
      family.save();
      user.save();
      res.status(200).json({ message: "You've joined the family" });
    }
  };

  quit = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user.id);

    await Family.findByIdAndUpdate(id, {
      $pull: { members: req.user.id },
    });
    user.family = null;
    user.save();
    res.status(200).json({ message: "You've quit the family" });
  };

  addExpense = async (req, res) => {
    const { id } = req.params;
    const { value, name } = req.body;
    const expenseObj = new Expense({
      name,
      value,
      author: req.user.id,
    });
    const family = await Family.findById(id);
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
    const { budgetValue } = req.body;
    const { id } = req.params;
    const family = await Family.findById(id);
    family.budget = budgetValue;
    family.save();
    res.status(200).json({ message: "You've changed the budget" });
  };
}

const familyController = new FamilyController();
export default familyController;
