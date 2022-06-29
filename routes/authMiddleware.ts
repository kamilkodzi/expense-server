import { ExpressError } from "../error/ExpressError";

const isLogedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw ExpressError.unAuthenticated(
      "You are not authenticated to view this resources, please log in first"
    );
  }
};

const isAuthorized = () => {
  console.log("To be implemented");
};

export { isLogedIn };
