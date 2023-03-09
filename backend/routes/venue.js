import express from 'express';
import wrapAsynch from '../utils/AsynchErrorHandle.js';
import venueDb from '../data-access/venue-db/index.js';

const { bulkInsert, listVenues, addVenue, getVenueById } = venueDb;

const venueRouter = express.Router();

// Used Only to push some muck data initially
venueRouter.post(
  '/many',
  wrapAsynch(async (req, res) => {
    await bulkInsert();
  })
);

venueRouter.get(
  '/',
  wrapAsynch(async (req, res) => {
    const venues = await listVenues();
    res.json({ venues: venues });
  })
);

venueRouter.post(
  '/',
  wrapAsynch(async (req, res) => {
    console.log(req.body);
    const newVenue = await addVenue(req.body);
    res.status(201).json(newVenue._id);
  })
);

// Find event by id
venueRouter.get(
  '/:id',
  wrapAsynch(async (req, res) => {
    const venue = await getVenueById(req.params);
    if (venue) {
      res.status(200).json(venue);
    } else {
      throw Error('Venue not found');
    }
  })
);

export default venueRouter;
