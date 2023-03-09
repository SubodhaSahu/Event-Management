import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV;
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DB = process.env.MONGO_DB || '';
const dbName = encodeURIComponent(MONGO_DB);
const dbProvider = process.env.DB_PROVIDER || 'mongo'
let MONGO_URL = `mongodb+srv://${encodeURIComponent(MONGO_USERNAME)}:${encodeURIComponent(MONGO_PASSWORD)}@cluster0.y4ibni5.mongodb.net/${MONGO_DB}`;

if (env !== 'production') {
    MONGO_URL = process.env.MONGO_URL || '';
}

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;
const SECRET_KEY = process.env.SECRET_KEY || '';

export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    UNPROCESSABLE_ENTITY = 412
}
  

export const config = {
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

