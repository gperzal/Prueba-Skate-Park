import express from 'express';
const router = express.Router();

import { registerSkater, loginSkater, getSkaters, updateSkater, deleteSkater, getSkater } from '../controllers/skatersController.js';
import { validateSkater } from '../middlewares/validateSkater.js';
import { protect } from '../middlewares/authMiddleware.js';
import fileUpload from 'express-fileupload';


// Middleware para manejo de archivos
router.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 5 * 1024 * 1024 }, // Ejemplo: límite de tamaño de archivo de 5MB
}));


// Ruta para registrar un nuevo participante
router.post('/register', validateSkater, registerSkater); //OK

// Ruta para el inicio de sesión
router.post('/login', loginSkater); //OK

// Ruta protegida para obtener todos los participantes
router.get('/', getSkaters);     // OK
router.get('/:id', getSkater);     // OK

// Ruta protegida para actualizar un participante
router.put('/:id', protect, updateSkater);

// Ruta protegida para eliminar un participante
router.delete('/:id', protect, deleteSkater);




export default router;