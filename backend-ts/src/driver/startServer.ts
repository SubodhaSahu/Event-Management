import express, { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
import Logging from '../library/Logging';
import authorRoutes from '../routes/Author';
import eventRoutes from '../routes/Events';
import userRoutes from '../routes/User';
import venueRoutes from '../routes/Venues';

const app = express();

const PORT = config.server.port;

//Start the server
const startServer = () => {
    /** Log the request for debugging/developing purpose*/
    app.use((req, res, next) => {
    /** Log the incoming req */
    Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

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
    app.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

    /** Routes */
    app.use('/authors', authorRoutes);
    app.use('/events', eventRoutes);
    app.use('/users', userRoutes);
    app.use('/venues', venueRoutes)
    

    /** Error handling */
    app.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

   
    app.listen(PORT, () => {
        Logging.info(`Server is listening on port ${PORT}`);
    });
}

export default startServer;