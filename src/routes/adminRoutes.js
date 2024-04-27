import express from 'express';
import { getDashboard, approveUser, listPendingAccounts } from '../controllers/adminController.js';
import { protect, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.get('/dashboard', protect, authorizeAdmin, getDashboard);
router.get('/dashboard', getDashboard);
router.put('/approve/:id',  approveUser);
router.get('/pending-accounts', protect, authorizeAdmin, listPendingAccounts);

export default router;
