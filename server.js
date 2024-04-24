import express from 'express';
const app = express();
// import dotenv from 'dotenv';
import skaterRoutes from './src/routes/skaterRoutes.js';

import { engine } from 'express-handlebars';

import errorHandler from './src/middlewares/errorHandler.js';

import sequelize from './src/config/dbConfig.js';


// Middleware de manejo de errores siempre al final
app.use(errorHandler);






app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Configuración de Handlebars 
app.engine('.hbs', engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Rutas
app.use('/api/skaters', skaterRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
      console.log(`\nServidor corriendo en http://localhost:${PORT}`);
  });
});