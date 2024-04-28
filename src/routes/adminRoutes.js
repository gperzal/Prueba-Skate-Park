import express from 'express';
import { getDashboard, approveUser } from '../controllers/adminController.js';
import { protect, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.get('/dashboard', protect, authorizeAdmin, getDashboard);
router.get('/dashboard', protect, authorizeAdmin, getDashboard);
router.put('/approve/:id', approveUser);

export default router;
