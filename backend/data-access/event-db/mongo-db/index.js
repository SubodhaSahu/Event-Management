import Event from '../../../db/mongodb/models/events.js';
import eventSeeds from '../../../db/mongodb/models/events.js';

// get total documents in the Events collection
export async function blukInsert() {
  return await Event.insertMany(eventSeeds);
}

// get total documents in the Events collection
export async function eventCount() {
  return await Event.countDocuments();
}

// get the events
export async function listEvents(page, limit) {
  return await Event.find({})
    .limit(limit * 1)
    .skip((page - 1) * limit);
}

// Add a new event
export async function addEvent(eventInfo) {
  const newEvent = new Event(eventInfo);
  await newEvent.save();
  return newEvent;
}

// Get the event By ID
export async function getEventById({ id }) {
  const event = await Event.findById(id);
  return event;
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
