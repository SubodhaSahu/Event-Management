import express from 'express';
import { Schemas, ValidateJoi } from '../middleware/Joi';
import Auth from '../controllers/Auth';

const router = express.Router();

router.post('/login', ValidateJoi(Schemas.user.login), Auth.login);
router.post('/signup',ValidateJoi(Schemas.user.create), Auth.signup);
router.post('/:refresh', Auth.getRefreshToken);

export default router;