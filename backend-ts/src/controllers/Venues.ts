import { NextFunction, Request, Response } from "express";
import venueService from "../services/Venues";

const createVenue = async (req: Request, res: Response) => { 
    const { name, address } = req.body;
    const venueObj = {name: name, address: address}
    try {
        const venue = await venueService.createVenue(venueObj);
        res.status(201).json(venue);
    } catch (error) {
        res.status(500).json(error);
    }
}

const readAll = async (req: Request, res: Response) => { 
    try {
        const venues = await venueService.getAll();
        return res.status(200).json({ venues });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
    }
}

const getVenueById = async (req: Request, res: Response) => { 
    const venueId = req.params.venueId;
    try {
        const venue = await venueService.getVenueById(venueId);
        return res.status(200).json({ venue });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateVenueById = async (req: Request, res: Response) => { 
    const venueId = req.params.venueId;
    const { name, address } = req.body;
    const venueObj = { name: name, address: address }
    try {
        const user = await venueService.updateVenueById(venueId, venueObj);
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteVenueById  = async (req: Request, res: Response) => {
    const venueId = req.params.venueId;

    try {
        const venue = await venueService.deleteVenueById(venueId);
        return res.status(200).json({ venue, message: 'Venue deleted' });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export default {readAll, createVenue, getVenueById, updateVenueById, deleteVenueById}
