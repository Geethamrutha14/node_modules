import express from 'express';
import { loginController, SignupController } from '../controllers/user.controller.js';

const router = express.Router();
router.get('/login',loginController);
router.get('/signup',SignupController);

export default router;