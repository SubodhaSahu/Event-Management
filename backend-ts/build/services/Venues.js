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
const Venue_1 = __importDefault(require("../models/Venue"));
const Events_1 = __importDefault(require("../models/Events"));
//To Create new User
const createVenue = (venue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newVenue = new Venue_1.default({
            name: venue.name,
            address: venue.address
        });
        yield newVenue.save();
        return newVenue;
    }
    catch (error) {
        //TODO: Do something with the error
        return Promise.reject(error);
    }
});
//To Fetch all the Venues
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 0 means ignore the column & 1 means fetch the column details.
        return yield Venue_1.default.find({});
        //.select({ id: 1, name: 1, email: 1, password: 0 });
    }
    catch (error) {
        //Do something with the error
        return Promise.reject(error);
    }
});
//To fetch a single Event By ID
const getVenueById = (venueId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Venue_1.default.findById(venueId);
    }
    catch (error) {
        // Do something with the error
        return Promise.reject(error);
    }
});
// To update a single author details by id
const updateVenueById = (venueId, venueDetail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Events_1.default.deleteMany({ eventVenue: venueId });
        return yield Venue_1.default.findByIdAndUpdate(venueId, venueDetail, {
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
const deleteVenueById = (venueId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Venue_1.default.findByIdAndDelete(venueId);
    }
    catch (error) {
        // Do something with the error
        return Promise.reject(error);
    }
});
exports.default = { getAll, createVenue, getVenueById, updateVenueById, deleteVenueById };
