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
    type: Schema.Types.ObjectId,
    ref: 'Venue',
  },
});

const Event = model('Event', eventShema);

export default Event;
