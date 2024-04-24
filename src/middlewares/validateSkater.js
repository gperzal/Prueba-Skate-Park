import { body, validationResult } from 'express-validator';

const validateSkater = [
    // Validar el email
    body('email')
        .isEmail()
        .withMessage('Must be a valid email address'),

    // Validar el nombre
    body('nombre')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name must not be empty'),

    // Validar la contraseña solo en el registro
    body('password')
        .if((value, { req }) => req.path === '/register')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    // Validar años de experiencia
    body('anos_experiencia')
        .isInt({ min: 0 })
        .withMessage('Years of experience must be a non-negative integer'),

    // Validar especialidad
    body('especialidad')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Specialty must not be empty'),

    // Validar estado
    body('estado')
        .isBoolean()
        .withMessage('State must be a boolean value'),  



    // Middleware para manejar los resultados de la validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export { validateSkater };
