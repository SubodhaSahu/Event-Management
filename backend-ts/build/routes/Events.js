"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Event_1 = __importDefault(require("../controllers/Event"));
const Joi_1 = require("../middleware/Joi");
const router = express_1.default.Router();
router.post('/', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.event.create), Event_1.default.createEvent);
router.get('/:eventId', Event_1.default.getEventById);
router.get('/', Event_1.default.readAll);
router.get('/v/:venueId', Event_1.default.readAll);
router.put('/:eventId', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.event.update), Event_1.default.updateEventById);
router.delete('/:eventId', Event_1.default.deleteEventById);
exports.default = router;
