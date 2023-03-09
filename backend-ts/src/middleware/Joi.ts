import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IAuthor } from '../models/Author';
import { IEvent } from '../models/Events';
import { IUsers } from '../models/Users';
import { HttpCode } from '../config/config';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });

            next();
        } catch (errors) {
            let message = "Validation failed";

            if (errors instanceof Error) {
                message = errors.message;
            }
            
            return res.status(HttpCode.UNPROCESSABLE_ENTITY).json({ message});
        }
    };
};

//Event Validation
const eventType = {
    eventTitle: Joi.string(),
    eventDesc:  Joi.string(),
    eventDate: Joi.string(),
    eventVenue: Joi.string().required()
}

//User Validation
const userType = {
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string()
}

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        })
    },
    event:  {
        create: Joi.object<IEvent>(eventType),
        update: Joi.object<IEvent>(eventType)
    },
    user:  {
        create: Joi.object<IUsers>(userType),
        update: Joi.object<IUsers>(userType)
    },
};