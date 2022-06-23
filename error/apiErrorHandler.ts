import { ExpressError } from "./ExpressError";

const apiErrorHandler = (err, req, res, next) => {
  // in prod, do not use console.log or console.error because
  // it is not async
  console.error(err);

  if (err instanceof ExpressError) {
    console.log("hello");
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json("something went wrong");
};

export default apiErrorHandler;
