import { Schema, model } from 'mongoose';

const eventShema = new Schema({
  eventTitle: {
    type: String,
    required: [true, 'Event Title is required'],
  },
  eventDesc: {
    type: String,
    required: [true, 'Description is required'],
  },
  eventDate: {
    type: String,
    required: [true, 'Please provide the event date'],
  },
  eventVenue: {
    type: String,
    required: [true, 'Please provide the event venue'],
  },
});

const Event = model('Event', eventShema);

export default Event;
