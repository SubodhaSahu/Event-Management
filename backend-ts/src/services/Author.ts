import mongoose from "mongoose";
import Author, { IAuthor, IAuthorModel } from "../models/Author";

//To Create new Author
const createAuthor = async (authorDetails: IAuthor): Promise<IAuthorModel> => {
    try {
        const newAuthor = new Author({
            _id: new mongoose.Types.ObjectId(),
            name: authorDetails.name
        });

        const author = await newAuthor.save();
        return author;
    } catch (error) {  
        //TODO: Do something with the error
        return Promise.reject(error);
   }
}


//To Fetch all the Authors
const getAll = async (): Promise<IAuthorModel[]> => {
    try {
        return await Author.find();
    } catch (error) {     
         //TODO: Do something with the error
         return Promise.reject(error);
    }
}

//To fetch a single Author By ID
const getAuthorById = async (authorId: string) : Promise<IAuthorModel | null>  => {
    try {
        return await Author.findById(authorId);
    } catch (error) {     
        // Do something with the error
        return Promise.reject(error);
   }
}

// To update a single author details by id
const updateAuthorById = async (authorId: string, authorDetails: IAuthor) : Promise<IAuthorModel | null>  => {
    try {
        return await Author.findByIdAndUpdate(authorId, authorDetails, {
            runValidators: true,
            new: true,
        });
    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}

// To delete a single author details by id
const deleteAuthorById = async (authorId: string) : Promise<IAuthorModel | null>  => {
    try {
        return await Author.findByIdAndDelete(authorId);
    } catch (error) {     
    // Do something with the error
        return Promise.reject(error);
    }
}

export default { getAll, createAuthor, getAuthorById, updateAuthorById, deleteAuthorById };