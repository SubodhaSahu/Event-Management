"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventDTO {
    constructor(data) {
        this.eventTitle = data.eventTitle;
        this.eventDesc = data.eventDesc;
        this.eventDate = data.eventDate;
        this.eventVenue = data.eventVenue;
    }
}
exports.default = EventDTO;
