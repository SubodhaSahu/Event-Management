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
const Event_1 = __importDefault(require("../services/Event"));
const AsynchErrorHandle_1 = __importDefault(require("../utils/AsynchErrorHandle"));
const config_1 = require("../config/config");
const EventDTO_1 = __importDefault(require("../dto/EventDTO"));
const createEvent = (0, AsynchErrorHandle_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventObj = new EventDTO_1.default(req.body);
    const event = yield Event_1.default.createEvent(eventObj);
    res.status(config_1.HttpCode.CREATED).json(event);
}));
const readAll = (0, AsynchErrorHandle_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const venueId = req.params.venueId || '';
    const events = yield Event_1.default.getAll(venueId);
    return res.status(config_1.HttpCode.OK).json({ events });
}));
const getEventById = (0, AsynchErrorHandle_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const events = yield Event_1.default.getEventById(Number(eventId));
    return res.status(config_1.HttpCode.OK).json({ events });
}));
const updateEventById = (0, AsynchErrorHandle_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const eventObj = new EventDTO_1.default(req.body);
    const events = yield Event_1.default.updateEventById(Number(eventId), eventObj);
    return res.status(config_1.HttpCode.OK).json({ events });
}));
const deleteEventById = (0, AsynchErrorHandle_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const eventExist = yield Event_1.default.getEventById(Number(eventId));
    if (eventExist) {
        const event = yield Event_1.default.deleteEventById(Number(eventId));
        return res.status(config_1.HttpCode.OK).json({ event, message: 'Event deleted' });
    }
    else {
        return res.status(config_1.HttpCode.OK).json({ message: 'No Event Found with the provided Event Id' });
    }
}));
exports.default = { readAll, createEvent, getEventById, updateEventById, deleteEventById };
