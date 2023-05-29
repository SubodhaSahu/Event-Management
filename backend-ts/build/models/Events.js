"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Venue_1 = __importDefault(require("./Venue"));
const EventSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true
    },
    eventTitle: {
        type: String,
        required: [true, 'Event Title is required'],
    },
    eventDesc: {
        type: String,
        required: [true, 'Description is required'],
    },
    eventDate: {
        type: String,
        required: [true, 'Please provide the event date'],
    },
    eventVenue: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: Venue_1.default,
    },
});
EventSchema.pre("save", function (next) {
    let docs = this;
    mongoose_1.default.model('Event', EventSchema).countDocuments(function (error, counter) {
        if (error)
            return next(error);
        docs.id = counter + 1;
        next();
    });
});
EventSchema.method('getPublicFields', function getPublicFields() {
    var _a;
    return {
        id: (_a = this.id) !== null && _a !== void 0 ? _a : '',
        eventTitle: this.eventTitle,
        eventDesc: this.eventDesc,
        eventDate: this.eventDate,
        eventVenue: this.eventVenue
    };
});
exports.default = (0, mongoose_1.model)('Event', EventSchema);
