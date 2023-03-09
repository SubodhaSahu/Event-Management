import mongoose, { Document, Schema, Types, Model, model } from "mongoose";
import Venue from "./Venue";

type Nullable<T> = T | null;

// Create an interface representing a document in MongoDB.
export interface IEvent {
    id?: Nullable<number>,
    eventTitle: string,
    eventDesc:  Nullable<string>, // We can do it like this salary: string | null, but used a type for reuse
    eventDate: string,
    eventVenue: Types.ObjectId
}

// Put all event instance methods in this interface:
interface IEventMethods {
  getPublicFields(): {};
}


// export interface IEventModel extends IEvent, IEventMethods, Document {
//   id: number
// } 

// Create a new Model type that knows about IUserMethods...
export type IEventModel = Model<IEvent, {}, IEventMethods>;
 

const EventSchema = new Schema<IEvent, IEventModel, IEventMethods>(  
    {
        id: {
            type: Number,
            unique: true
        },
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
            ref: Venue,
          },
          
          
    }
);

EventSchema.pre("save", function(next){
    let docs = this;
    mongoose.model('Event', EventSchema).countDocuments(function(error, counter){
        if(error) return next(error);
        docs.id = counter+1;
        next();
    });   
});

EventSchema.method('getPublicFields', function getPublicFields() {
  return {
            id: this.id ?? '',
            eventTitle: this.eventTitle,
            eventDesc: this.eventDesc,
            eventDate: this.eventDate,
            eventVenue: this.eventVenue
        };
});

export default model<IEvent, IEventModel>('Event', EventSchema);
