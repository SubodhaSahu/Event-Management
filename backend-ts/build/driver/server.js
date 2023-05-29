"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const startServer_1 = __importDefault(require("./startServer"));
const Routes_1 = __importDefault(require("./Routes"));
//Connect to the database
(0, connection_1.default)();
//Start the express server
const app = (0, startServer_1.default)();
const newRoute = new Routes_1.default(app);
newRoute.setRoutes();
