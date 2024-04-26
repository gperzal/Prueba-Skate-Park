// staticFiles.js
import express from 'express';
import { engine } from 'express-handlebars';


const setupStaticFiles = (app) => {
    app.use(express.static('public'));
    app.engine('.hbs', engine({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');

};

export default setupStaticFiles;
