import express from 'express';
import { getDashboard, approveUser } from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard/', getDashboard);
router.put('/approve/:id', approveUser);

export default router;
