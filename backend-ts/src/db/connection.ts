import mongoConnect from "./mongoConnect";
import { config } from '../config/config';
import Logging from '../library/Logging';

const connectDB = () => {
    try {
        if (config.dbProvider === 'mongo') {
            mongoConnect.connect();
            Logging.info('MONGO CONNECTION OPEN!!!');
        } else {
            Logging.info('Please provide your database provider such as mongo, mySql etc.');
        }

    } catch (err) {
        Logging.error(err);
    }
};

export default connectDB;