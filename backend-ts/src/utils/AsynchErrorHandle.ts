import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../config/config';

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

const validationError = (error : Error) => {
  const errorMsg = (error as any)?.errors;
  const validationErrors : { [key: string]: string; } = {};

  (Object.keys(errorMsg) as Array<keyof typeof errorMsg>).reduce((accumulator, current) => {
    validationErrors[errorMsg[current].path] = errorMsg[current].message;
    return accumulator;
  }, [] as (typeof errorMsg[keyof typeof errorMsg])[]);

  return validationErrors;
};

function wrapAsync(fn : Function) {
  return function (req : Request, response : Response, next: NextFunction) {
    fn(req, response, next).catch((exception: Error) => {
        const statusCode = (exception as any)?.httpStatus || HttpCode.UNPROCESSABLE_ENTITY;
        let errorMsg = (exception as any)?.message || 'Unexpected Error';
    
        if ((exception as any)?.name === 'ValidationError') {
          errorMsg = validationError(exception);
        }
        return response.status(statusCode).json({ message: errorMsg });
    });
  };
}

export default wrapAsync;
