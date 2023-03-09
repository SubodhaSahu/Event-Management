import express from 'express';
import controller from '../controllers/Event';
import { Schemas, ValidateJoi } from '../middleware/Joi';
//import { AuthMiddleWare } from '../middleware/Auth';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.event.create),  controller.createEvent);
router.get('/:eventId', controller.getEventById);
router.get('/', controller.readAll);
router.put('/:eventId', ValidateJoi(Schemas.event.update), controller.updateEventById);
router.delete('/:eventId', controller.deleteEventById);

export default router;
