import { NextFunction, Request, Response } from "express";
import eventService from "../services/Event";
import wrapAsync from "../utils/AsynchErrorHandle";
import { HttpCode } from "../config/config";

const createEvent = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { eventTitle, eventDesc, eventDate, eventVenue } = req.body;
    // const venue = await Venue.findOne({ name: 'Time & Life Buildilng' });
    const eventObj = { id: 0, eventTitle: eventTitle, eventDesc: eventDesc, eventDate: eventDate, eventVenue: eventVenue }
    
    const event = await eventService.createEvent(eventObj);
    res.status(HttpCode.OK).json(event);
});

const readAll = wrapAsync(async (req: Request, res: Response, next: NextFunction) => { 
    const events = await eventService.getAll();
    return res.status(HttpCode.OK).json({ events });
})

const getEventById = wrapAsync(async (req: Request, res: Response, next: NextFunction) => { 
    const eventId = req.params.eventId;

    const events = await eventService.getEventById(Number(eventId));
    return res.status(HttpCode.OK).json({ events });
})

const updateEventById = wrapAsync(async (req: Request, res: Response, next: NextFunction) => { 
    const eventId = req.params.eventId;
    const { eventTitle, eventDesc, eventDate, eventVenue } = req.body;

    //const venue = await Venue.findOne({ name: 'Time & Life Buildilng' });
    const eventObj = { eventTitle: eventTitle, eventDesc: eventDesc, eventDate: eventDate, eventVenue: eventVenue }
    const events = await eventService.updateEventById(Number(eventId), eventObj);
    return res.status(HttpCode.OK).json({ events });
})
const deleteEventById  = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.eventId;

    const eventExist = await eventService.getEventById(Number(eventId));
    if (eventExist) {
        const event = await eventService.deleteEventById(Number(eventId));
        return res.status(HttpCode.OK).json({ event, message: 'Event deleted' });
    } else {
        return res.status(HttpCode.OK).json({ message: 'No Event Found with the provided Event Id' });
    }
   
})

export default {readAll, createEvent, getEventById, updateEventById, deleteEventById}

