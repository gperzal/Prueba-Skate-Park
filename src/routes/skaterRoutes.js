import express from 'express';
const router = express.Router();

import { registerSkater, loginSkater, getSkaters, updateSkater, deleteSkater } from '../controllers/skatersController.js';
import { validateSkater } from '../middlewares/validateSkater.js';
import { protect } from '../middlewares/authMiddleware.js';


// Ruta para registrar un nuevo participante
router.post('/register', validateSkater, registerSkater);

// Ruta para el inicio de sesión
router.post('/login', loginSkater);

// Ruta protegida para obtener todos los participantes
router.get('/', protect, getSkaters);

// Ruta protegida para actualizar un participante
router.put('/:id', protect, updateSkater);

// Ruta protegida para eliminar un participante
router.delete('/:id', protect, deleteSkater);

export default router;