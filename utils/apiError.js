class ApiError extends Error {
  constructor(statusCode, message, stack = "", error = []) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.succcess = false;
    this.error = error;
    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
