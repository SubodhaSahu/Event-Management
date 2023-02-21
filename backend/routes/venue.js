import express from 'express';
import wrapAsynch from '../utils/AsynchErrorHandle.js';
import venueDb from '../data-access/venue-db/index.js';

const { bulkInsert, listVenues } = venueDb;

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
    res.json(venues);
  })
);

export default venueRouter;
