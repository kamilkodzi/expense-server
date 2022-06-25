import { ExpressError } from "../error/ExpressError";

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw ExpressError.unAuthenticated(
      "You are not authenticated to view this resources, please log in first"
    );
  }
};

export { isAuth };
