import express, { NextFunction, Request, Response, Router }  from 'express';
import controller from '../controllers/Author';
import { Schemas, ValidateJoi } from '../middleware/Joi';
import { AuthMiddleWare } from '../middleware/Auth';

const router = express.Router();

router.post('/', [ValidateJoi(Schemas.author.create), AuthMiddleWare], controller.createAuthor);
router.get('/:authorId', controller.readAuthor);
router.get('/', AuthMiddleWare, controller.readAll);
router.patch('/:authorId', ValidateJoi(Schemas.author.update), controller.updateAuthor);
router.delete('/:authorId', controller.deleteAuthor);

export default router;
