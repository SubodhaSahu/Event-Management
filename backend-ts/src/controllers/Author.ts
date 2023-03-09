import { NextFunction, Request, Response } from "express";
import authorService from '../services/Author';
import wrapAsync from "../utils/AsynchErrorHandle";

const createAuthor = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body;
        const author = await authorService.createAuthor({ name: name });
        res.status(201).json(author);
});

const readAuthor = async (req: Request, res: Response, next: NextFunction) => { 
    const authorId = req.params.authorId;
    try {
        const author = await authorService.getAuthorById(authorId);
        return res.status(200).json({ author });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
const readAll = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const authors = await authorService.getAll();
        return res.status(200).json({ authors });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
const updateAuthor = async (req: Request, res: Response, next: NextFunction) => { 
    const authorId = req.params.authorId;
    const { name } = req.params;
    try {
        const authors = await authorService.updateAuthorById(authorId, {name: name});
        return res.status(200).json({ authors });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    try {
        const authors = await authorService.deleteAuthorById(authorId);
        return res.status(200).json({ authors, message: 'Author deleted' });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };