import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import Logging from '../library/Logging';
import { HttpCode, config } from '../config/config';

export const AuthMiddleWare = async (req : Request, res: Response, next :NextFunction) => {
    try {
        //For Unit Test By pass the authentication
        if (config.env === 'test') {
            Logging.info('Middle ware for Unit test');
            return next();    
        }
        
        const { authorization } = req.headers;
        if (authorization) {
            const decodedToken = await jwt.verify(authorization, config.SECRET_KEY);
            Logging.info('Middle ware for validation');    
            next();       
        } else {
            Logging.error('Auth Token required in the header');
            return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Auth Token required in the header as Authorization ' });
        }
    } catch (error) {
        Logging.error(error);
        let errorMsg = (error as any)?.message || 'Unexpected Error';
        return res.status(HttpCode.UNAUTHORIZED).json({ message: errorMsg });
    }
}