// frontendRoutes.js
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';;  // Asegúrate de que las rutas de importación sean correctas

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicPath = path.join(__dirname, '../../public/assets/pages');



const router = express.Router();


// Ruta para registro
router.get('/register', (req, res) => {
    if (req.user) {
        res.redirect('/'); // Redireccionar si ya están logueados
    } else {
        res.render('pages/register', { title: 'Register' });
    }
});

// Ruta para inicio de sesión
router.get('/login', (req, res) => {
    if (req.user) {
        console.log("req.user: ", req.user);
        res.redirect('/api/skaters'); // Redireccionar si ya están logueados
    } else {
        res.render('pages/login', { title: 'Login', user: req.user || null });
    }
});


router.get('/profiles', protect, async (req, res) => {
    if (req.user) {
        // Renderizar la vista de perfil y pasar el usuario como contexto
        res.json({
            id: req.user.id,
            name: req.user.name,
            role: req.user.role,
        });

    } else {
        res.status(401).render('error', {
            message: 'Not authorized to view this page'
        });
    }
});
router.get('/profile', async (req, res) => {
    res.render('pages/profile', { title: 'Your Profile', user: req.user });
});


router.get('/about', (req, res) => {
    res.render('pages/about', { title: 'About' });
});

router.get('/', (req, res) => {
    redirect('/api/skaters');
})

// // Ruta para la administración, protegida y solo para admins
router.get('/nooo', (req, res) => {
    res.sendFile(path.join(publicPath, 'nooo.html'));
});

router.get('*', (req, res) => {
    res.status(404).sendFile(path.join(publicPath, '404.html'));
});



export default router;
