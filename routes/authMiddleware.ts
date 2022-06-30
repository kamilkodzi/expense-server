import { ExpressError } from "../error/ExpressError";
import Family from "../models/Family";
import User from "../models/User";

export const isLogedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw ExpressError.unAuthenticated(
      "You are not authenticated to view this resources, please log in first"
    );
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

export const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const currentUserId = req.user.id;
  try {
    const results = await User.findById(id);
    if (results && id === currentUserId) {
      next();
    } else {
      throw ExpressError.unAuthorized(
        "You are not authorized to perform this action"
      );
    }
  } catch (error) {
    next(error);
  }
};
