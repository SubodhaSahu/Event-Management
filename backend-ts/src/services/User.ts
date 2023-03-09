import Users, { IUsers, IUsersModel } from "../models/Users";
import bcrypt from "bcrypt";

//To Create new User
const createUser = async (userDetails: IUsers): Promise<{}> => {
    try {
        const newUser = new Users({
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password
        });

        const user = await newUser.save();
        return newUser.getPublicFields();

    } catch (error) {    
        //TODO: Do something with the error
        return Promise.reject(error);
   }
}

//To Fetch all the Users
const getAll = async (): Promise<IUsersModel[]> => {
    try {
       // 0 means ignore the column & 1 means fetch the column details.
        return await Users.find({});
            //.select({ id: 1, name: 1, email: 1, password: 0 });
    } catch (error) {    
         //Do something with the error
         return Promise.reject(error);
    }
}

//To fetch a single Event By ID
const getUserById = async (userId: number) : Promise<IUsers | null>  => {
    try {
        return await Users.findOne({ id: userId });
    } catch (error) {     
        // Do something with the error
        return Promise.reject(error);
   }
}

interface IUserUpdate {
    name: string,
    email: string
}

// To update a single author details by id
const updateUserById = async (userId: number, userDetails: IUserUpdate) : Promise<IUsers | null>  => {
    try {
        return await Users.findOneAndUpdate({ id: userId }, userDetails, {
            runValidators: true,
            new: true,
        });
    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}

// To delete a single author details by id
const deleteUserById = async (userId: number) : Promise<IUsers | null>  => {
    try {
        return await Users.findOneAndDelete({ id: userId });
    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}

const getUserByEmail = async (email:string) : Promise<IUsers | null>  => {
    try {
        return await Users.findOne({ email: email });
    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}
const validateCredential = async (email: string, password : string): Promise<Boolean> => {
    try {
        const user = await Users.findOne({ email: email });
        const match = await bcrypt.compare(password, user!.password);
        return match ? true : false;
    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}

export default {getAll, createUser, getUserById, updateUserById, deleteUserById, getUserByEmail, validateCredential}