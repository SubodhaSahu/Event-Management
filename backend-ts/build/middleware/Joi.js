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
exports.Schemas = exports.ValidateJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const config_1 = require("../config/config");
const ValidateJoi = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.body, { abortEarly: false });
            next();
        }
        catch (errors) {
            let message = "Validation failed";
            if (errors instanceof Error) {
                message = errors.message;
            }
            return res.status(config_1.HttpCode.UNPROCESSABLE_ENTITY).json({ message });
        }
    });
};
exports.ValidateJoi = ValidateJoi;
//Event Validation
const eventType = {
    eventTitle: joi_1.default.string().required(),
    eventDesc: joi_1.default.string(),
    eventDate: joi_1.default.string().required(),
    eventVenue: joi_1.default.string().required()
};
//User Validation
const userType = {
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
};
//Login Field Validation
const loginFields = {
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required()
};
exports.Schemas = {
    event: {
        create: joi_1.default.object(eventType),
        update: joi_1.default.object(eventType)
    },
    user: {
        create: joi_1.default.object(userType),
        update: joi_1.default.object(userType),
        login: joi_1.default.object(loginFields)
    }
};
