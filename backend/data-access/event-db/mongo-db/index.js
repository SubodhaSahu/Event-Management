import Event from '../../../db/mongodb/models/events.js';
import eventSeeds from '../../../db/mongodb/seeds/events.js';
import Venue from '../../../db/mongodb/models/venues.js';


// Insert the bluck record
export async function blukInsert() {
  const venue = await Venue.findOne({ name: 'Time & Life Buildilng' });
  eventSeeds.map((eventInfo) => {
    eventInfo.eventVenue = venue;
  });
  return await Event.insertMany(eventSeeds);
}

// get total documents in the Events collection
export async function eventCount() {
  return await Event.countDocuments();
}

// get the events
export async function listEvents(page, limit) {
  return await Event.find({})
    .populate('eventVenue', 'name')
    .limit(limit * 1)
    .skip((page - 1) * limit);
}

// Add a new event
export async function addEvent(eventInfo) {
  const venue = await Venue.findById(eventInfo.eventVenue);
  eventInfo.eventVenue = venue;
  let newEvent = new Event(eventInfo);

  return await newEvent.save();
}

// Get the event By ID
export async function getEventById({ id }) {
  return await Event.findById(id).populate('eventVenue');
}

// update the event by id
export async function updateEventById(id, eventDetails) {
  return await Event.findByIdAndUpdate(id, eventDetails, {
    runValidators: true,
    new: true,
  });
}

// update the event by id
export async function deleteEventById(id) {
  return await Event.findByIdAndDelete(id);
}
