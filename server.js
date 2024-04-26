import express from 'express';
const app = express();
// import dotenv from 'dotenv';
import skaterRoutes from './src/routes/skaterRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import frontendRoutes from './src/routes/frontendRoutes.js';

import setupStaticFiles from './src/middlewares/staticFiles.js';

import errorHandler from './src/middlewares/errorHandler.js';


import sequelize from './src/config/dbConfig.js';

const PORT = process.env.PORT || 3000;
// Middleware de manejo de errores siempre al final
app.use(errorHandler);
setupStaticFiles(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Rutas
app.use('/api/skaters', skaterRoutes);
app.use('/api/admin', adminRoutes);
app.use('/', frontendRoutes);





sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`\nServidor corriendo en http://localhost:${PORT}/\n`);
  });
});