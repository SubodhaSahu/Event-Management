import { NextFunction, Request, Response } from "express";
import eventService from "../services/Event";
import wrapAsync from "../utils/AsynchErrorHandle";
import { HttpCode } from "../config/config";
import EventDTO from "../dto/EventDTO";

const createEvent = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const eventObj = new EventDTO(req.body);
    
    const event = await eventService.createEvent(eventObj);
    res.status(HttpCode.CREATED).json(event);
});

const readAll = wrapAsync(async (req: Request, res: Response, next: NextFunction) => { 
    const venueId = req.params.venueId || '';
    const events = await eventService.getAll(venueId);
    return res.status(HttpCode.OK).json({ events });
})

const getEventById = wrapAsync(async (req: Request, res: Response, next: NextFunction) => { 
    const eventId = req.params.eventId;

    const events = await eventService.getEventById(Number(eventId));
    return res.status(HttpCode.OK).json({ events });
})

const updateEventById = wrapAsync(async (req: Request, res: Response, next: NextFunction) => { 
    const eventId = req.params.eventId;
    const eventObj = new EventDTO(req.body);
    
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

