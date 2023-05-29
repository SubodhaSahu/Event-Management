"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customErrorHandler = exports.AppError = void 0;
class AppError extends Error {
    // description: string;
    constructor(args) {
        super(args.message);
        this.statusCode = args.statusCode;
        this.message = args.message || 'Error';
    }
}
exports.AppError = AppError;
const handleKnownExceptions = (error, response) => {
    const { statusCode, message } = error;
    response.status(statusCode).json({ error: message });
};
const handleUnknownExceptions = (error, response) => {
    response.status(500).json({ error: { message: 'Something went wrong.' } });
};
const customErrorHandler = (err, res) => {
    err instanceof AppError ? handleKnownExceptions(err, res) : handleUnknownExceptions(err, res);
};
exports.customErrorHandler = customErrorHandler;
