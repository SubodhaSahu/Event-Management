import mongoose, { Document, Schema, Model, model } from "mongoose";

type Nullable<T> = T | null;

export interface IUsers {
    id?: Nullable<number>,
    name: string,
    email: string,
    password: string,
    role?: number

}

// Put all event instance methods in this interface:
interface IUserMethods {
    getPublicFields(): {};
  }

// Create a new Model type that knows about IUserMethods...
export type IUsersModel = Model<IUsers, {}, IUserMethods>;

const UserSchema: Schema = new Schema <IUsers, IUsersModel, IUserMethods>(
    {
        id: { type: Number,unique: true},
        name: {type: String, required: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, min: 5 },
        role: {type: Number, enum :[1, 2], default: 2} //1 For Admin and 2 For User role type
    },
    {
        versionKey: false
    }
);


//generate the auto generated Id before save
UserSchema.pre("save", function(next){
    let docs = this;
    mongoose.model('User', UserSchema).countDocuments(function(error, counter){
        if(error) return next(error);
        docs.id = counter+1;
        next();
    });   
});

//Get the minimum field while creating/fetching a user
UserSchema.method('getPublicFields', function getPublicFields() {
    return {
            id: this.id ?? '',
            name: this.name,
            email: this.email,
            role: this.role == 2 ? 'User' : 'Admin'
          };
  });


export default model<IUsers, IUsersModel>('Users', UserSchema);
