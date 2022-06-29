class ExpressError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super();
    this.message = message;
    this.code = code;
  }

  static badRequest(msg: string) {
    return new ExpressError(400, msg);
  }
  static internal(msg: string) {
    return new ExpressError(500, msg);
  }
  static unAuthorized(msg: string) {
    return new ExpressError(403, msg);
  }
  static unAuthenticated(msg: string) {
    return new ExpressError(401, msg);
  }

  static couldNotStoreInDatabase(msg: string) {
    return new ExpressError(422, msg);
  }
}

export { ExpressError };
