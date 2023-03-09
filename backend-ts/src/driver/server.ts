import connectDB from '../db/connection';
import startServer from './startServer';

//Connect to the database
connectDB();

//Start the express server
startServer();

