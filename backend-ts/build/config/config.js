"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.HttpCode = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
const env = process.env.NODE_ENV;
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DB = process.env.MONGO_DB || '';
const dbName = encodeURIComponent(MONGO_DB);
const dbProvider = process.env.DB_PROVIDER || 'mongo';
let MONGO_URL = `mongodb+srv://${encodeURIComponent(MONGO_USERNAME)}:${encodeURIComponent(MONGO_PASSWORD)}@cluster0.y4ibni5.mongodb.net/${MONGO_DB}`;
if (env !== 'production') {
    MONGO_URL = process.env.MONGO_URL || '';
}
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;
const SECRET_KEY = process.env.SECRET_KEY || '';
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
    HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpCode[HttpCode["UNPROCESSABLE_ENTITY"] = 412] = "UNPROCESSABLE_ENTITY";
})(HttpCode = exports.HttpCode || (exports.HttpCode = {}));
exports.config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    env: env,
    dbProvider: dbProvider,
    SECRET_KEY: SECRET_KEY
};
