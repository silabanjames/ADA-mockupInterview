export class DuplicateSaveError extends Error {
  public readonly code = 'DUPLICATE_SAVE';
  constructor(message = 'Movie already saved by this user') {
    super(message);
    this.name = 'DuplicateSaveError';
  }
}

export class UnavailableInCountryError extends Error {
  public readonly code = 'UNAVAILABLE_IN_COUNTRY';
  constructor(message = 'Movie is not available in specified country') {
    super(message);
    this.name = 'UnavailableInCountryError';
  }
}

export class NotFoundError extends Error {
  public readonly code = 'NOT_FOUND';
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class BadRequest extends Error {
  public readonly code = 'BAD_REQUEST';
  constructor(message = 'Bad request') {
    super(message);
    this.name = 'BadRequest';
  }
}