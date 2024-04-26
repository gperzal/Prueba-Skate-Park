// frontendRoutes.js
import express from 'express';
import { protect, authorizeAdmin } from '../middlewares/authMiddleware.js';;  // Asegúrate de que las rutas de importación sean correctas

const router = express.Router();

// Ruta para la página de inicio que muestra todos los skaters
// router.get('/', (req, res) => {
//     res.render('index', { title: 'Home', user: req.user || null });
// });

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



// Ruta para el perfil de usuario, protegida
router.get('/profile', protect, (req, res) => {
    res.render('pages/profile', { title: 'Your Profile', user: req.user });
});

// Ruta para la administración, protegida y solo para admins
router.get('/admin', [protect, authorizeAdmin], (req, res) => {
    res.render('pages/admin', { title: 'Admin Dashboard', user: req.user });
});

// Ruta para cerrar sesión
// router.get('/logout', protect, (req, res) => {
//     // Lógica para "cerrar sesión" al usuario
//     req.session.destroy();
//     res.redirect('/');
// });

export default router;
