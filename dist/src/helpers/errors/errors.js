"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = exports.NotFoundError = exports.UnavailableInCountryError = exports.DuplicateSaveError = void 0;
class DuplicateSaveError extends Error {
    constructor(message = 'Movie already saved by this user') {
        super(message);
        this.code = 'DUPLICATE_SAVE';
        this.name = 'DuplicateSaveError';
    }
}
exports.DuplicateSaveError = DuplicateSaveError;
class UnavailableInCountryError extends Error {
    constructor(message = 'Movie is not available in specified country') {
        super(message);
        this.code = 'UNAVAILABLE_IN_COUNTRY';
        this.name = 'UnavailableInCountryError';
    }
}
exports.UnavailableInCountryError = UnavailableInCountryError;
class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message);
        this.code = 'NOT_FOUND';
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class BadRequest extends Error {
    constructor(message = 'Bad request') {
        super(message);
        this.code = 'BAD_REQUEST';
        this.name = 'BadRequest';
    }
}
exports.BadRequest = BadRequest;
