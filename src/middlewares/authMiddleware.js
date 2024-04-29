import jwt from 'jsonwebtoken';

// Suponiendo que tu secret está almacenado en variables de entorno
const jwtSecret = process.env.JWT_SECRET

export const protect = (req, res, next) => {
    let token;
    console.log("req.headers.authorization: ", req.headers.authorization)

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token del encabezado
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token
            const decoded = jwt.verify(token, jwtSecret);
            // Adjuntar el usuario al objeto de solicitud
            req.user = decoded;  // Aquí, `decoded` es el payload que incluiste al firmar el token
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};


export const protectAdmin = (req, res, next) => {
    const token = req.cookies.jwt; // Recupera el token de la cookie
    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        // res.status(401).json({ message: 'Not authorized, no token' });
        res.redirect('/nooo');
    }
};
