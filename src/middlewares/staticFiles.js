// staticFiles.js
import express from 'express';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';


const setupStaticFiles = (app) => {
    app.use(express.static('public'));
    app.engine('.hbs', engine({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
    
    app.use(cookieParser());
};

export default setupStaticFiles;
