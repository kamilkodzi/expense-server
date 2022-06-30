import { ExpressError } from "../error/ExpressError";
import User from "../models/User";

const isLogedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw ExpressError.unAuthenticated(
      "You are not authenticated to view this resources, please log in first"
    );
  }
};

const isOwner = async (req, res, next) => {
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

export { isLogedIn, isOwner };
