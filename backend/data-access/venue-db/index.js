import {
  bulkInsert,
  listVenues,
  addVenue,
  getVenueById,
} from './mongo-db/index.js';

const venueDb = {
  bulkInsert,
  listVenues,
  addVenue,
  getVenueById,
};

export default venueDb;
