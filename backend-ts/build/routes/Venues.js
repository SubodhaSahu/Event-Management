"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Venues_1 = __importDefault(require("../controllers/Venues"));
// import { Schemas, ValidateJoi } from '../middleware/Joi';
//import { AuthMiddleWare } from '../middleware/Auth';
const router = express_1.default.Router();
router.post('/', Venues_1.default.createVenue);
router.get('/:venueId', Venues_1.default.getVenueById);
router.get('/', Venues_1.default.readAll);
router.put('/:venueId', Venues_1.default.updateVenueById);
router.delete('/:venueId', Venues_1.default.deleteVenueById);
exports.default = router;
