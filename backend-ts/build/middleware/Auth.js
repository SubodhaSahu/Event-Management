"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Logging_1 = __importDefault(require("../library/Logging"));
const config_1 = require("../config/config");
const AuthMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //For Unit Test By pass the authentication
        if (config_1.config.env === 'test') {
            Logging_1.default.info('Middle ware for Unit test');
            return next();
        }
        const { authorization } = req.headers;
        if (authorization) {
            const decodedToken = yield jsonwebtoken_1.default.verify(authorization, config_1.config.SECRET_KEY);
            Logging_1.default.info('Middle ware for validation');
            next();
        }
        else {
            Logging_1.default.error('Auth Token required in the header');
            return res.status(config_1.HttpCode.UNAUTHORIZED).json({ message: 'Auth Token required in the header as Authorization ' });
        }
    }
    catch (error) {
        Logging_1.default.error(error);
        let errorMsg = (error === null || error === void 0 ? void 0 : error.message) || 'Unexpected Error';
        return res.status(config_1.HttpCode.UNAUTHORIZED).json({ message: errorMsg });
    }
});
exports.AuthMiddleWare = AuthMiddleWare;
