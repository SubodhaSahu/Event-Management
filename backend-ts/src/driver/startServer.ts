import express, { Application, NextFunction, Request, Response } from 'express';

import { config } from '../config/config';
import Logging from '../library/Logging';

import { AppError, customErrorHandler } from '../utils/ErrorHandler';

export const app:Application = express();

const PORT = config.server.port;

//Start the server
const startServer = () => {
    /** Log the request for debugging/developing purpose*/
    app.use((req, res, next) => {
    /** Log the incoming req */
    Logging.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the return response */
        Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });
        next();
    });


    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

     /** Rules of the API */
     app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Healthcheck */
    app.get('/ping', (req : Request, res : Response, next : NextFunction) => res.status(200).json({ hello: 'world' }));

    /** Error handling */
    app.use((err : AppError, req : Request, res : Response, next : NextFunction) => {
        const error = new Error('Not found');
        Logging.error(error);
        customErrorHandler(err, res);
    });

    app.listen(PORT, () => {
        Logging.info(`Server is listening on port ${PORT}`);
    });

    return app;
}

export default startServer;