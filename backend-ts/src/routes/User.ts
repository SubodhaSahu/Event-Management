import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateJoi } from '../middleware/Joi';
//import { AuthMiddleWare } from '../middleware/Auth';

const router = express.Router();

router.post('/', controller.createUser);
router.post('/login',  controller.login);
router.get('/:userId', controller.getUserById);
router.get('/', controller.readAll);
router.put('/:userId', controller.updateUserById);
router.delete('/:userId', controller.deleteUserById);

export default router;
