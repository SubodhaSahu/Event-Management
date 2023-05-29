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
const User_1 = __importDefault(require("../services/User"));
const AsynchErrorHandle_1 = __importDefault(require("../utils/AsynchErrorHandle"));
const config_1 = require("../config/config");
const readAll = (0, AsynchErrorHandle_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.getAll();
    return res.status(config_1.HttpCode.OK).json({ users });
}));
const getUserById = (0, AsynchErrorHandle_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield User_1.default.getUserById(Number(userId));
    return res.status(config_1.HttpCode.OK).json({ user });
}));
const updateUserById = (0, AsynchErrorHandle_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const { name, email } = req.body;
    const userObj = { name: name, email: email };
    const userExist = yield User_1.default.getUserById(Number(userId));
    if (userExist) {
        const user = yield User_1.default.updateUserById(Number(userId), userObj);
        return res.status(config_1.HttpCode.OK).json({ user });
    }
    else {
        return res.status(config_1.HttpCode.OK).json({ message: 'Wrong User Id' });
    }
}));
const deleteUserById = (0, AsynchErrorHandle_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const userExist = yield User_1.default.getUserById(Number(userId));
    if (userExist) {
        const user = yield User_1.default.deleteUserById(Number(userId));
        return res.status(200).json({ user, message: 'User deleted' });
    }
    else {
        return res.status(config_1.HttpCode.OK).json({ message: 'Wrong User Id' });
    }
}));
exports.default = { readAll, getUserById, updateUserById, deleteUserById };
