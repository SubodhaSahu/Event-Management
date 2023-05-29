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
const Users_1 = __importDefault(require("../models/Users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
const config_1 = require("../config/config");
//To Create new User
const createUser = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new Users_1.default({
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password
        });
        const user = yield newUser.save();
        return newUser.getPublicFields();
    }
    catch (error) {
        //TODO: Do something with the error
        return Promise.reject(error);
    }
});
//To Fetch all the Users
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 0 means ignore the column & 1 means fetch the column details.
        return yield Users_1.default.find({});
        //.select({ id: 1, name: 1, email: 1, password: 0 });
    }
    catch (error) {
        //Do something with the error
        return Promise.reject(error);
    }
});
//To fetch a single Event By ID
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Users_1.default.findOne({ id: userId });
    }
    catch (error) {
        // Do something with the error
        return Promise.reject(error);
    }
});
// To update a single author details by id
const updateUserById = (userId, userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Users_1.default.findOneAndUpdate({ id: userId }, userDetails, {
            runValidators: true,
            new: true,
        });
    }
    catch (error) {
        // Do something with the error
        return Promise.reject(error);
    }
});
// To delete a single author details by id
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Users_1.default.findOneAndDelete({ id: userId });
    }
    catch (error) {
        // Do something with the error
        return Promise.reject(error);
    }
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Users_1.default.findOne({ email: email });
    }
    catch (error) {
        // Do something with the error
        return Promise.reject(error);
    }
});
const validateCredential = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.default.findOne({ email: email });
        const match = yield bcrypt_1.default.compare(password, user.password);
        return match ? true : false;
    }
    catch (error) {
        let errorMsg = (error === null || error === void 0 ? void 0 : error.message) || 'Unexpected Error';
        throw new ErrorHandler_1.AppError({
            statusCode: config_1.HttpCode.UNAUTHORIZED,
            message: errorMsg,
        });
    }
});
exports.default = { getAll, createUser, getUserById, updateUserById, deleteUserById, getUserByEmail, validateCredential };
