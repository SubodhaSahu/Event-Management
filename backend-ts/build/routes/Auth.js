"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Joi_1 = require("../middleware/Joi");
const Auth_1 = __importDefault(require("../controllers/Auth"));
const router = express_1.default.Router();
router.post('/login', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.user.login), Auth_1.default.login);
router.post('/signup', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.user.create), Auth_1.default.signup);
router.post('/:refresh', Auth_1.default.getRefreshToken);
exports.default = router;
