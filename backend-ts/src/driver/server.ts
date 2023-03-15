import connectDB from '../db/connection';
import startServer from './startServer';
import Routes from './Routes';

//Connect to the database
connectDB();

//Start the express server
const app = startServer();

const newRoute = new Routes(app);
newRoute.setRoutes();

