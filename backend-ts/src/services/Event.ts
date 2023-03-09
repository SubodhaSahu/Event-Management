import Events, { IEvent, IEventModel } from "../models/Events";

//To Create new Events
const createEvent = async (eventDetails: IEvent): Promise<{}> => {
    try {
        const newEvent = new Events({
            eventTitle: eventDetails.eventTitle,
            eventDesc: eventDetails.eventDesc,
            eventDate: eventDetails.eventDate,
            eventVenue: eventDetails.eventVenue,
        });

        const event = await newEvent.save();
        return newEvent.getPublicFields();
    } catch (error) {    
        //TODO: Do something with the error
        return Promise.reject(error);
   }
}

//To Fetch all the Events
const getAll = async (): Promise<IEventModel[]> => {
    try {
       // 0 means ignore the column & 1 means fetch the column details.
        return await Events.find({})
            .select({ _id: 0, id: 1, eventDesc: 1, eventDate: 1, eventTitle: 1 })
            .populate('eventVenue', 'name');
    } catch (error) {    
         //Do something with the error
         return Promise.reject(error);
    }
}

//To fetch a single Event By ID
const getEventById = async (eventId: number) : Promise<IEventModel | null>  => {
    try {
        return await Events.findOne({ id: eventId });
    } catch (error) {     
        // Do something with the error
        return Promise.reject(error);
   }
}

// To update a single author details by id
const updateEventById = async (eventId: number, eventDetails: IEvent) : Promise<IEventModel | null>  => {
    try {
        return await Events.findOneAndUpdate({ id: eventId }, eventDetails, {
            runValidators: true,
            new: true,
        });
    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}

// To delete a single author details by id
const deleteEventById = async (eventId: number) : Promise<IEventModel | null>  => {
    try {
        return await Events.findOneAndDelete({ id: eventId });
    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}

export default {getAll, createEvent, getEventById, updateEventById, deleteEventById }