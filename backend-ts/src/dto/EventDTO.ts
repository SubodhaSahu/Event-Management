/**
 * DTO stands for data transfer object which is meant by defining a 
 * container that contains group of values or field
 * The Data Transfer Objects are objects which bridge the domain, business
 *  and application layer. DTOs are basically “dumb” objects holding key-value 
 * pairs.
 * o keep it simpler, domain is the database, business is our logic in handler function and 
 * application means our web service API.
 */
import { IEvent } from "../models/Events";

class EventDTO {
    eventTitle: string;
    eventDesc: string | null;
    eventDate: string;
    eventVenue: object;

    constructor(data :IEvent) {
        this.eventTitle = data.eventTitle;
        this.eventDesc = data.eventDesc;
        this.eventDate = data.eventDate;
        this.eventVenue = data.eventVenue
    }
}

export default EventDTO