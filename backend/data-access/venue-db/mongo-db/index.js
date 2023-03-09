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

export async function addVenue(venue) {
  let newVenue = new Venue(venue);
  return await newVenue.save();
}

// Get the event By ID
export async function getVenueById({ id }) {
  return await Venue.findById(id);
}
