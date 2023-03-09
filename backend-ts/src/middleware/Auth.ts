import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import Logging from '../library/Logging';
import { HttpCode, config } from '../config/config';

export const AuthMiddleWare = async (req : Request, res: Response, next :NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (authorization) {
            const decodedToken = await jwt.verify(authorization, config.SECRET_KEY);
            Logging.info('Middle ware for validation');    
            next();       
        } else {
            Logging.error('Auth Token required in the header');
            return res.status(HttpCode.UNAUTHORIZED).json('Auth Token required in the header as Authorization ');
        }
    } catch (error) {
        Logging.error(error);
        return res.status(HttpCode.UNAUTHORIZED).json({ error });
    }
}