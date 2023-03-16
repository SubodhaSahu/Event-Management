import Venues, { IVenue, IVenueModel } from "../models/Venue";
import Events from "../models/Events";

//To Create new User
const createVenue = async (venue: IVenue): Promise<{}> => {
    try {
        const newVenue = new Venues({
            name: venue.name,
            address: venue.address
        });

        await newVenue.save();
        return newVenue;

    } catch (error) {    
        //TODO: Do something with the error
        return Promise.reject(error);
   }
}

//To Fetch all the Venues
const getAll = async (): Promise<IVenueModel[]> => {
    try {
       // 0 means ignore the column & 1 means fetch the column details.
        return await Venues.find({});
            //.select({ id: 1, name: 1, email: 1, password: 0 });
    } catch (error) {    
         //Do something with the error
         return Promise.reject(error);
    }
}

//To fetch a single Event By ID
const getVenueById = async (venueId: string) : Promise<IVenue | null>  => {
    try {
        return await Venues.findById(venueId);
    } catch (error) {     
        // Do something with the error
        return Promise.reject(error);
   }
}

// To update a single author details by id
const updateVenueById = async (venueId: string, venueDetail: IVenue) : Promise<IVenue | null>  => {
    try {
        await Events.deleteMany({ eventVenue: venueId })
        return await Venues.findByIdAndUpdate(venueId, venueDetail, {
            runValidators: true,
            new: true,
        });
    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}

// To delete a single author details by id
const deleteVenueById = async (venueId: string) : Promise<IVenue | null>  => {
    try {
        return await Venues.findByIdAndDelete(venueId);
    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}


export default {getAll, createVenue, getVenueById, updateVenueById, deleteVenueById}