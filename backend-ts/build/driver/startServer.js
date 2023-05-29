"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
const Logging_1 = __importDefault(require("../library/Logging"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
exports.app = (0, express_1.default)();
const PORT = config_1.config.server.port;
//Start the server
const startServer = () => {
    /** Log the request for debugging/developing purpose*/
    exports.app.use((req, res, next) => {
        /** Log the incoming req */
        Logging_1.default.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log the return response */
            Logging_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    exports.app.use(express_1.default.urlencoded({ extended: true }));
    exports.app.use(express_1.default.json());
    /** Rules of the API */
    exports.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Healthcheck */
    exports.app.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));
    /** Error handling */
    exports.app.use((err, req, res, next) => {
        const error = new Error('Not found');
        Logging_1.default.error(error);
        (0, ErrorHandler_1.customErrorHandler)(err, res);
    });
    exports.app.listen(PORT, () => {
        Logging_1.default.info(`Server is listening on port ${PORT}`);
    });
    return exports.app;
};
exports.default = startServer;
