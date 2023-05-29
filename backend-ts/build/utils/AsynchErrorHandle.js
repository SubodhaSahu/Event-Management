"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
// interface IException extends Error {
//   httpStatus: string // or any other type
//   errorMsg: {},
//   name? : string
// }
// class HttpException extends Error {
//   httpStatus?: number,
//   errorMsg?: {},
//   name? : string
// }
const validationError = (error) => {
    const errorMsg = error === null || error === void 0 ? void 0 : error.errors;
    const validationErrors = {};
    Object.keys(errorMsg).reduce((accumulator, current) => {
        validationErrors[errorMsg[current].path] = errorMsg[current].message;
        return accumulator;
    }, []);
    return validationErrors;
};
function wrapAsync(fn) {
    return function (req, response, next) {
        fn(req, response, next).catch((exception) => {
            const statusCode = (exception === null || exception === void 0 ? void 0 : exception.httpStatus) || config_1.HttpCode.UNPROCESSABLE_ENTITY;
            let errorMsg = (exception === null || exception === void 0 ? void 0 : exception.message) || 'Unexpected Error';
            if ((exception === null || exception === void 0 ? void 0 : exception.name) === 'ValidationError') {
                errorMsg = validationError(exception);
            }
            return response.status(statusCode).json({ message: errorMsg });
        });
    };
}
exports.default = wrapAsync;
