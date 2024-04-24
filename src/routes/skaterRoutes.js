import express from 'express';
const { Router } = express;
const router = Router();

import { registerSkater, loginSkater } from '../controllers/skatersController.js';


router.post('/register', registerSkater);
router.post('/login', loginSkater);

export { router as skaterRoutes };
