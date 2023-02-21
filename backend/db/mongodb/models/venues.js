import { Schema, model } from 'mongoose';

const venueShema = new Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zip: { type: String },
  },
});

const Venue = model('Venue', venueShema);

export default Venue;
