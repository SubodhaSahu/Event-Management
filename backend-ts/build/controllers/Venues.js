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
const Venues_1 = __importDefault(require("../services/Venues"));
const VenueDTO_1 = __importDefault(require("../dto/VenueDTO"));
const config_1 = require("../config/config");
const AsynchErrorHandle_1 = __importDefault(require("../utils/AsynchErrorHandle"));
const createVenue = (0, AsynchErrorHandle_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venueObj = new VenueDTO_1.default(req.body);
    console.log(venueObj);
    const venue = yield Venues_1.default.createVenue(venueObj);
    res.status(config_1.HttpCode.CREATED).json(venue);
}));
const readAll = (0, AsynchErrorHandle_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venues = yield Venues_1.default.getAll();
    return res.status(config_1.HttpCode.OK).json({ venues });
}));
const getVenueById = (0, AsynchErrorHandle_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venueId = req.params.venueId;
    const venue = yield Venues_1.default.getVenueById(venueId);
    return res.status(config_1.HttpCode.OK).json({ venue });
}));
const updateVenueById = (0, AsynchErrorHandle_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venueId = req.params.venueId;
    const venueObj = new VenueDTO_1.default(req.body);
    const user = yield Venues_1.default.updateVenueById(venueId, venueObj);
    return res.status(config_1.HttpCode.OK).json({ user });
}));
const deleteVenueById = (0, AsynchErrorHandle_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venueId = req.params.venueId;
    const venue = yield Venues_1.default.deleteVenueById(venueId);
    return res.status(config_1.HttpCode.OK).json({ venue, message: 'Venue deleted' });
}));
exports.default = { readAll, createVenue, getVenueById, updateVenueById, deleteVenueById };
