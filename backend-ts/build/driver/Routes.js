"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = __importDefault(require("../routes/Auth"));
const Venues_1 = __importDefault(require("../routes/Venues"));
const Events_1 = __importDefault(require("../routes/Events"));
const User_1 = __importDefault(require("../routes/User"));
const Auth_2 = require("../middleware/Auth");
const eventRoute = '/events';
const venueRoute = '/venues';
const authRoute = '/auth';
const userRoute = '/users';
class Routes {
    constructor(app) {
        this.app = app;
    }
    setRoutes() {
        this.app.use(venueRoute, Auth_2.AuthMiddleWare, Venues_1.default);
        this.app.use(eventRoute, Auth_2.AuthMiddleWare, Events_1.default);
        this.app.use(authRoute, Auth_1.default);
        this.app.use(userRoute, Auth_2.AuthMiddleWare, User_1.default);
    }
}
exports.default = Routes;
