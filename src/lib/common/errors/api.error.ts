export class ApiError extends Error {
  code = 500;
  constructor(message: string, code = 500) {
    super(message);
    this.code = code;
  }

  getMessage() {
    return this.message;
  }
}

