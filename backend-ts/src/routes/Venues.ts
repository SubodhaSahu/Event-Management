import express from 'express';
import controller from '../controllers/Venues';
// import { Schemas, ValidateJoi } from '../middleware/Joi';
//import { AuthMiddleWare } from '../middleware/Auth';

const router = express.Router();

router.post('/',  controller.createVenue);
router.get('/:venueId', controller.getVenueById);
router.get('/', controller.readAll);
router.put('/:venueId', controller.updateVenueById);
router.delete('/:venueId', controller.deleteVenueById);

export default router;
