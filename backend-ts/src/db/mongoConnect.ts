import mongoose from 'mongoose';
import { config } from '../config/config';
import Logging from '../library/Logging';

/** Connect to Mongo DB */
export default {
    connect() {
        mongoose.set('strictQuery', false);
        mongoose
            .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
            .then(() => {
                Logging.info('MONGO CONNECTION OPEN!!!');
            })
            .catch((err) => {
                Logging.error('OH NO MONGO CONNECTION ERROR!!!!');
                Logging.error(err);
            });
    }
}