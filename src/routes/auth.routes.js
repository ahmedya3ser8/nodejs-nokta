import express from 'express';

import { signup, signin, logout, getMe } from '../controllers/auth.controller.js';
import { signinValidation, signupValidation } from '../validations/auth.validation.js';
import protectMiddleware from '../middlewares/protect.middleware.js';

const router = express.Router();

router.post('/signup', signupValidation, signup);

router.post('/signin', signinValidation, signin);

router.post('/logout', logout);

router.get('/me', protectMiddleware, getMe);

export default router;
