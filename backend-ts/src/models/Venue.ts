import mongoose, { Document, Schema } from "mongoose";

type Nullable<T> = T | null;

export interface IVenueAddress {
    street: Nullable<string>,
    city: Nullable<string>,
    state: Nullable<string>,
    country: Nullable<string>,
    zip: Nullable<string>,
}

export interface IVenue {
    name: string,
    address : IVenueAddress
}

export interface IVenueModel extends IVenue, Document { }

const VenueSchema: Schema = new Schema(  
    {
        name: { type: String, required: true },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            zip: { type: String },
        }
    }
);

export default mongoose.model<IVenueModel>('Venue', VenueSchema);
