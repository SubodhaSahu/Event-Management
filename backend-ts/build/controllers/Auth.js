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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AsynchErrorHandle_1 = __importDefault(require("../utils/AsynchErrorHandle"));
const User_1 = __importDefault(require("../services/User"));
const config_1 = require("../config/config");
const hashPassword = (pw) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10; //The cost of processing the data
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const hash = yield bcrypt_1.default.hash(pw, salt);
    return hash;
});
const signup = (0, AsynchErrorHandle_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hasPassword = yield hashPassword(password);
    const userObj = { name: name, email: email, password: hasPassword };
    const user = yield User_1.default.createUser(userObj);
    res.status(config_1.HttpCode.CREATED).json(user);
}));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userDetails = yield User_1.default.getUserByEmail(email);
        //user exist
        if (userDetails) {
            const match = yield User_1.default.validateCredential(email, password);
            if (match) {
                const role = userDetails.role == 1 ? 'Admin' : 'User';
                // Issue token
                const userId = userDetails.id;
                const secretKey = config_1.config.SECRET_KEY;
                const payload = { userId };
                const token = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_KEY, {
                    expiresIn: '1h'
                });
                const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_KEY, {
                    expiresIn: '1d'
                });
                res.status(config_1.HttpCode.OK).json({
                    success: true,
                    message: 'Login successful',
                    userInfo: { name: userDetails.name, email, role },
                    token: token,
                    refreshToken: refreshToken
                });
            }
            else {
                res.status(config_1.HttpCode.UNAUTHORIZED).json({ success: false, message: 'Invalid Credential' });
            }
        }
        else {
            res.status(config_1.HttpCode.UNAUTHORIZED).json({ success: false, message: 'Invalid Credential' });
        }
    }
    catch (err) {
        next(err);
    }
});
const getRefreshToken = (0, AsynchErrorHandle_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(refreshToken, config_1.config.SECRET_KEY);
        const userId = decodedToken.userId;
        const secretKey = config_1.config.SECRET_KEY;
        const payload = { userId };
        const token = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_KEY, {
            expiresIn: '1h'
        });
        const newRefreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_KEY, {
            expiresIn: '1d'
        });
        res.status(config_1.HttpCode.OK).json({
            token,
            refreshToken: newRefreshToken
        });
    }
    catch (error) {
        //next(error);
        let errorMsg = (error === null || error === void 0 ? void 0 : error.message) || 'Unexpected Error';
        return res.status(config_1.HttpCode.UNAUTHORIZED).json({ message: errorMsg });
    }
}));
exports.default = { login, signup, getRefreshToken };
