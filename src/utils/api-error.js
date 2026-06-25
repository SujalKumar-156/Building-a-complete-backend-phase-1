class ApiErrorr extends Error {
  constructor(
    statusCode,
    message = " Somehting went wrong",
    errors = [], // this will be array of errors
    stack = "", //stack trace given by errors
  ) {
    // First thing to do is utilize the error class
    super(message); //Calling the error class which this class is extended to and this is expecting only 1 parameter
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;

    // stack will not be available permanently so we have to check first whether it exists or not
    // It captures stacktrace automatically
    // We are not going to define this, it is defined automatically
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    // Creating here and defining
    this.data = null;
    this.success = false;
  }
}

export { ApiErrorr };
