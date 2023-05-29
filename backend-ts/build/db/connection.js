"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoConnect_1 = __importDefault(require("./mongoConnect"));
const config_1 = require("../config/config");
const Logging_1 = __importDefault(require("../library/Logging"));
const connectDB = () => {
    try {
        if (config_1.config.dbProvider === 'mongo') {
            mongoConnect_1.default.connect();
            Logging_1.default.info('MONGO CONNECTION OPEN!!!');
        }
        else {
            Logging_1.default.info('Please provide your database provider such as mongo, mySql etc.');
        }
    }
    catch (err) {
        Logging_1.default.error(err);
    }
};
exports.default = connectDB;
