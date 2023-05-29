"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
//import { AuthMiddleWare } from '../middleware/Auth';
const router = express_1.default.Router();
router.get('/:userId', User_1.default.getUserById);
router.get('/', User_1.default.readAll);
router.put('/:userId', User_1.default.updateUserById);
router.delete('/:userId', User_1.default.deleteUserById);
exports.default = router;
