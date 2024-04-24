import express from 'express';
import dotenv from 'dotenv';
import { skaterRoutes } from './src/routes/skaterRoutes.js';

import { engine } from 'express-handlebars';

import { errorHandler } from './src/middlewares/errorHandler.js';
import { validateParams } from './src/middlewares/validateParams.js';

import sequelize from './src/config/dbConfig.js';


// Middleware de manejo de errores siempre al final
// app.use(errorHandler);

// Ejemplo de uso del middleware de validación en la ruta de registro
// app.post('/register', validateParams, (req, res) => {
//   res.status(201).send('User registered');
// });

// Ejemplo de uso del middleware de validación en la ruta de login
// app.post('/login', validateParams, (req, res) => {
//   res.send('Logged In!');
// });




dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Configuración de Handlebars (plantillas) // Especifica la extensión que se usará para las vistas plantillas
app.engine('.hbs', engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Rutas
app.use('/skaters', skaterRoutes);

const PORT = process.env.PORT || 3000;




sequelize.sync().then(() => {
  console.log("\nConexión a la base de datos establecida con éxito.");
  app.listen(PORT, () => {
    console.log(`\nServidor corriendo en http://localhost:${PORT}\n`);
  });
}).catch(error => {
  console.error('No se pudo conectar a la base de datos:', error);
});