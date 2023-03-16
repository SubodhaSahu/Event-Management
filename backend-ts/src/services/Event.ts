import { HttpCode } from "../config/config";
import Events, { IEvent, IEventModel, IEventPublicField } from "../models/Events";
import Venue from "../models/Venue";
import { AppError } from "../utils/ErrorHandler";


//To Create new Events
const createEvent = async (eventDetails: object): Promise<IEventPublicField> => {
    try {
        const newEvent = new Events(eventDetails);

        const event = await newEvent.save();
        return newEvent.getPublicFields();
    } catch (error) {    
        //TODO: Do something with the error
        return Promise.reject(error);
   }
}

//To Fetch all the Events
const getAll = async (venueId: string | null): Promise<IEventModel[]> => {
    try {
        let condition = {};
        if (venueId != '') {
            condition = {eventVenue: venueId}
        }
       // 0 means ignore the column & 1 means fetch the column details.
        return await Events.find(condition)
            .select({ _id: 0, id: 1, eventDesc: 1, eventDate: 1, eventTitle: 1 })
            .populate('eventVenue', 'name');
    } catch (error) {    
         //Do something with the error
         return Promise.reject(error);
    }
}

type EventDataType = {
    eventTitle: string,
    eventDesc: string,
    eventDate: string,
    eventVenue: object,
    id: number
}

//To fetch a single Event By ID
const getEventById = async (eventId: number) : Promise<IEventPublicField | null>  => {
    try {
        const event = await Events.findOne({ id: eventId })
            .populate('eventVenue', 'name');
        if (!event) {
            throw new AppError({
                statusCode: HttpCode.UNPROCESSABLE_ENTITY,
                message: 'No Event Found With this Id',
            });
        } else {
            return event.getPublicFields();
        }
        
    } catch (error) {     
        // Do something with the error
        return Promise.reject(error);
   }
}

// To update a single author details by id
const updateEventById = async (eventId: number, eventDetails: {}) : Promise<IEventPublicField | null>  => {
    try {
        const event = await Events.findOneAndUpdate({ id: eventId }, eventDetails, {
            runValidators: true,
            new: true
        });

        if (!event) {
            throw new AppError({
                statusCode: HttpCode.UNPROCESSABLE_ENTITY,
                message: 'No Event Found With this Id',
            });
        } else {
            return event.getPublicFields();
        }
        
    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}

// To delete a single author details by id
const deleteEventById = async (eventId: number) : Promise<IEventPublicField | null>  => {
    try {
        const event = await Events.findOneAndDelete({ id: eventId });

        if (!event) {
            throw new AppError({
                statusCode: HttpCode.UNPROCESSABLE_ENTITY,
                message: 'No Event Found With this Id',
            });
        } else {
            return event.getPublicFields();
        }

    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}

export default {getAll, createEvent, getEventById, updateEventById, deleteEventById }