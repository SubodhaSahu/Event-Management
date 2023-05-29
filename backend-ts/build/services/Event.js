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
const config_1 = require("../config/config");
const Events_1 = __importDefault(require("../models/Events"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
//To Create new Events
const createEvent = (eventDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvent = new Events_1.default(eventDetails);
        const event = yield newEvent.save();
        return newEvent.getPublicFields();
    }
    catch (error) {
        //TODO: Do something with the error
        return Promise.reject(error);
    }
});
//To Fetch all the Events
const getAll = (venueId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let condition = {};
        if (venueId != '') {
            condition = { eventVenue: venueId };
        }
        // 0 means ignore the column & 1 means fetch the column details.
        return yield Events_1.default.find(condition)
            .select({ _id: 0, id: 1, eventDesc: 1, eventDate: 1, eventTitle: 1 })
            .populate('eventVenue', 'name');
    }
    catch (error) {
        //Do something with the error
        return Promise.reject(error);
    }
});
//To fetch a single Event By ID
const getEventById = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Events_1.default.findOne({ id: eventId })
            .populate('eventVenue', 'name');
        if (!event) {
            throw new ErrorHandler_1.AppError({
                statusCode: config_1.HttpCode.UNPROCESSABLE_ENTITY,
                message: 'No Event Found With this Id',
            });
        }
        else {
            return event.getPublicFields();
        }
    }
    catch (error) {
        // Do something with the error
        return Promise.reject(error);
    }
});
// To update a single author details by id
const updateEventById = (eventId, eventDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Events_1.default.findOneAndUpdate({ id: eventId }, eventDetails, {
            runValidators: true,
            new: true
        });
        if (!event) {
            throw new ErrorHandler_1.AppError({
                statusCode: config_1.HttpCode.UNPROCESSABLE_ENTITY,
                message: 'No Event Found With this Id',
            });
        }
        else {
            return event.getPublicFields();
        }
    }
    catch (error) {
        // Do something with the error
        return Promise.reject(error);
    }
});
// To delete a single author details by id
const deleteEventById = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Events_1.default.findOneAndDelete({ id: eventId });
        if (!event) {
            throw new ErrorHandler_1.AppError({
                statusCode: config_1.HttpCode.UNPROCESSABLE_ENTITY,
                message: 'No Event Found With this Id',
            });
        }
        else {
            return event.getPublicFields();
        }
    }
    catch (error) {
        // Do something with the error
        return Promise.reject(error);
    }
});
exports.default = { getAll, createEvent, getEventById, updateEventById, deleteEventById };
