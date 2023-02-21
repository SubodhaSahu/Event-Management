import Venue from '../../../db/mongodb/models/venues.js';
import venueSeeds from '../../../db/mongodb/seeds/venues.js';

// Insert the bluck record
export async function bulkInsert() {
  return await Venue.insertMany(venueSeeds)
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
}
export async function listVenues() {
  return await Venue.find({});
}
