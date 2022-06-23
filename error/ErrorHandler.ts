import { Response } from "express";
class ApiError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super();
    this.message = message;
    this.code = code;
  }
}

class ErrorHandler {
  private crashOrSendResponse = (err: Error | ApiError, res: Response) => {
    if (err instanceof ApiError) res.status(err.code).send(err.message);
    res.send(err.message);
    res.send("We have an erroe xD - test");
  };

  public async handleError(
    error: Error,
    responseStream: Response
  ): Promise<void> {
    await console.log("Error handler starts");
    await this.crashOrSendResponse(error, responseStream);
  }
}

export const errorHandler = new ErrorHandler();
