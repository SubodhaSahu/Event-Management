import { NextFunction, Request, Response } from "express";
import venueService from "../services/Venues";
import VenueDTO from "../dto/VenueDTO";
import { HttpCode } from "../config/config";
import wrapAsync from "../utils/AsynchErrorHandle";

const createVenue = wrapAsync(async (req: Request, res: Response) => { 
    const venueObj = new VenueDTO(req.body);
    console.log(venueObj);

    const venue = await venueService.createVenue(venueObj);
    res.status(HttpCode.CREATED).json(venue);
})

const readAll = wrapAsync(async (req: Request, res: Response) => { 
    const venues = await venueService.getAll();
    return res.status(HttpCode.OK).json({ venues });
})

const getVenueById = wrapAsync(async (req: Request, res: Response) => { 
    const venueId = req.params.venueId;

    const venue = await venueService.getVenueById(venueId);
    return res.status(HttpCode.OK).json({ venue });
})

const updateVenueById = wrapAsync(async (req: Request, res: Response) => { 
    const venueId = req.params.venueId;
    const venueObj = new VenueDTO(req.body);

    const user = await venueService.updateVenueById(venueId, venueObj);
    return res.status(HttpCode.OK).json({ user });
})

const deleteVenueById  = wrapAsync(async (req: Request, res: Response) => {
    const venueId = req.params.venueId;

    const venue = await venueService.deleteVenueById(venueId);
    return res.status(HttpCode.OK).json({ venue, message: 'Venue deleted' });

})

export default {readAll, createVenue, getVenueById, updateVenueById, deleteVenueById}
