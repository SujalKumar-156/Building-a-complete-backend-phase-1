class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    // By default message = success
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
