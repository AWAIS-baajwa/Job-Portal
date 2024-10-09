class ApiResponse {
  constructor(statusCode, data, message) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; //if statuscode is less then 400 it success will be set to true and if not to false
  }
}

export { ApiResponse };
