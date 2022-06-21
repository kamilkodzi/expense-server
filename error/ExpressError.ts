class ApiError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super();
    this.message = message;
    this.code = code;
  }

  static badRequest(msg: string) {
    return new ApiError(400, msg);
  }
  static internal(msg: string) {
    return new ApiError(500, msg);
  }
  static unauthorized(msg: string) {
    return new ApiError(403, msg);
  }
}

export default ApiError;
