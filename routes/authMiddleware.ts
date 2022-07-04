import { ExpressError } from "../error/ExpressError";
import Expense from "../models/Expense";
import Family from "../models/Family";
import User from "../models/User";

export const isLogedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    
    next();
  } else {
    throw ExpressError.unAuthenticated("Please login");
  }
};

export const isMemberOfHittedFamily = async (req, res, next) => {
  const { id } = req.params;
  const currentUserId = req.user._id;
  try {
    const family = await Family.findById(id);
    if (family.members.includes(currentUserId)) {
      next();
    } else {
      throw ExpressError.unAuthorized("You are not a member of this family");
    }
  } catch (error) {
    next(error);
  }
};

export const notMemberOfHittedFamily = async (req, res, next) => {
  const { id } = req.params;
  const currentUserId = req.user._id;
  try {
    const family = await Family.findById(id);
    if (!family.members.includes(currentUserId)) {
      next();
    } else {
      throw ExpressError.unAuthorized(
        "You are a member of this family already"
      );
    }
  } catch (error) {
    next(error);
  }
};

export const isHeadOfFamily = async (req, res, next) => {
  const { id } = req.params;
  const currentUserId = req.user._id;
  try {
    const family = await Family.findById(id);
    //@ts-ignore
    if (family.headOfFamily.equals(currentUserId)) {
      next();
    } else {
      throw ExpressError.unAuthorized("You are not head of the family");
    }
  } catch (error) {
    next(error);
  }
};

export const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const currentUserId = req.user.id;
  try {
    const results = await User.findById(id);
    if (results && id === currentUserId) {
      next();
    } else {
      throw ExpressError.unAuthorized(
        "You do not have sufficient rights to do that"
      );
    }
  } catch (error) {
    next(error);
  }
};

export const isOwnerOfExpense = async (req, res, next) => {
  const { expenseId } = req.params;
  const currentUserId = req.user.id;
  try {
    const results = await Expense.findById(expenseId);
    console.log(results);
    console.log(expenseId);
    console.log(currentUserId);
    //@ts-ignore
    if (results && results.author.equals(currentUserId)) {
      next();
    } else {
      throw ExpressError.unAuthorized(
        "You do not have sufficient rights to do that"
      );
    }
  } catch (error) {
    next(error);
  }
};
