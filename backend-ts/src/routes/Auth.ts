import express from 'express';
import Auth from '../controllers/Auth';

const router = express.Router();

router.post('/login', Auth.login);
router.post('/:refresh', Auth.getRefreshToken);

export default router;