import express from 'express';
import { getDashboard, approveUser, listPendingAccounts } from '../controllers/adminController.js';
import { protect, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, authorizeAdmin, getDashboard);
router.put('/approve/:id', protect, authorizeAdmin, approveUser);
router.get('/pending-accounts', protect, authorizeAdmin, listPendingAccounts);

export default router;
