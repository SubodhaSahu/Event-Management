import {
  listEvents,
  eventCount,
  blukInsert,
  addEvent,
  getEventById,
  updateEventById,
  deleteEventById,
} from './mongo-db/index.js'; //Swith the Database if required in future

const eventDb = {
  listEvents,
  eventCount,
  blukInsert,
  addEvent,
  getEventById,
  updateEventById,
  deleteEventById,
};

export default eventDb;
