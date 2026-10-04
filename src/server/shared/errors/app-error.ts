export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string = "INTERNAL_ERROR", statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found", code: string = "NOT_FOUND") {
    super(message, code, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Validation failed", code: string = "VALIDATION_ERROR") {
    super(message, code, 422);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad request", code: string = "BAD_REQUEST") {
    super(message, code, 400);
  }
}

export class InvalidDeepLinkError extends AppError {
  constructor(message: string = "Invalid or disallowed deep link target", code: string = "INVALID_DEEP_LINK") {
    super(message, code, 400);
  }
}
