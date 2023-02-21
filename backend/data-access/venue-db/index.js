import { bulkInsert, listVenues } from './mongo-db/index.js';

const venueDb = {
  bulkInsert,
  listVenues,
};

export default venueDb;
