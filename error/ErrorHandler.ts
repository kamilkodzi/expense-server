import { Response } from "express";
class ErrorHandler {
  crashOrSendResponse = (err: Error, res: Response) => {
    throw new Error("test bad a error");
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
