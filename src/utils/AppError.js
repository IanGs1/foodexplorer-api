class AppError {
  statusCode;
  message;

  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;