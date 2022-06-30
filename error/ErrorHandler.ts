import { Response } from "express";
import { ExpressError } from "./ExpressError";

class ErrorHandler {
  private crashOrSendResponse = async (
    err: Error | ExpressError,
    res: Response
  ) => {
    if (err instanceof ExpressError) {
      res.status(err.code).json({ message: err.message });
      return;
    }
    // in prod, do not use console.log or console.error
    // because it is not async, winston is good option to
    // handle errors. Will be implemented... maybe :)
    console.error(
      "Error handler starts - time to implements winston or something",
      err
    );
    res
      .status(500)
      .json({
        message: "Unhandled error exception, please contact with administrator",
      });
  };

  public async handleError(
    error: Error | ExpressError,
    responseStream: Response
  ): Promise<void> {
    await this.crashOrSendResponse(error, responseStream);
  }
}

export const asyncErrCatchWrapper = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
};

const errorHandler = new ErrorHandler();
export default errorHandler;
