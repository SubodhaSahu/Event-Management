import { Application } from "express";

import authRoutes from '../routes/Auth'
import venueRoutes from '../routes/Venues';
import eventRoutes from '../routes/Events';
import userRoutes from '../routes/User';
import { AuthMiddleWare } from "../middleware/Auth";

const eventRoute: string = '/events';
const venueRoute: string = '/venues';
const authRoute: string = '/auth';
const userRoute: string = '/users';

class Routes {
    app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    setRoutes() {
        this.app.use(venueRoute, AuthMiddleWare, venueRoutes);
        this.app.use(eventRoute, AuthMiddleWare, eventRoutes);
        this.app.use(authRoute, authRoutes);
        this.app.use(userRoute, AuthMiddleWare, userRoutes);
    }
}

export default Routes;