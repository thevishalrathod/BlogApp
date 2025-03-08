import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import expressEjsLayout from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

const app = express();
const PORT = 8080 || process.env.PORT;

// ----Middlewares for body parsing---
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Middleware for cookie parse
app.use(cookieParser());
app.use(methodOverride('_method'));

//----Middleware to set static files folder----
app.use(express.static('public'));

//----Templating ejs engine----
app.use(expressEjsLayout);
app.set('layout', './layouts/main_layout');
app.set('views', './views');
app.set('view engine', 'ejs');

//----To link routers----
import mainRouter from './server/routes/main.router.js';
import adminRouter from './server/routes/admin.router.js';

//----Middleware to route the routers
app.use('/', mainRouter);
app.use('/admin', adminRouter);

app.listen(PORT, (error)=>{
    if(error)
        console.log(error);
    else
        console.log(`BlogApp started at http://localhost:${PORT}`);
});