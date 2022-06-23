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
  static unauthorized(msg: string) {
    return new ExpressError(403, msg);
  }
}

export { ExpressError };
