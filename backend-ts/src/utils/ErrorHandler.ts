import express, { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../config/config';

interface AppErrorArgs {
    message: string;
    statusCode: HttpCode,
   // description: string;
  }

export class AppError extends Error {
    statusCode: number;
    message: string;
   // description: string;

    constructor(args: AppErrorArgs) {
        super(args.message);
        this.statusCode = args.statusCode;
        this.message = args.message || 'Error';
    }
}

const handleKnownExceptions = (error: AppError, response: Response) => {
    const { statusCode, message } = error;
    response.status(statusCode).json({error: message});
};

const handleUnknownExceptions = (error: Error, response: Response) => {
    response.status(500).json({ error: {message: 'Something went wrong.' }});
};

export const customErrorHandler = (err: AppError , res: any) => {
    err instanceof AppError ? handleKnownExceptions(err, res) : handleUnknownExceptions(err, res);
};