import express from 'express';
import dotenv from 'dotenv';   //--
import cors from 'cors';     //--
import cookieParser from 'cookie-parser';   //--
import fileupload from 'express-fileupload';   //--

import dbConnection from './dataBase/dbConnection.js';
import {errorMiddleware} from './middlewares/error.js';
import userRoutes from './router/userRoutes.js';
import employeRoutes from './router/employeRoutes.js';

const app = express();  //--

dotenv.config({path: "./config/config.env"});  //--

app.use(express.json()); //---

//--
app.use(cors({
    origin: [process.env.DESHBOARD_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));  

app.use(cookieParser());  //--for accessing cookies

app.use(express.urlencoded({extended:true}));  //--

//--
app.use(fileupload({
    useTempFiles: true,
    tempFileDir : '/temp/'
})); 

// import routes from './routes'
app.use("/api/user", userRoutes); //--User All Routes
app.use("/api/employe", employeRoutes); //--Employe All Routes

dbConnection();  //--

app.use(errorMiddleware);  //--

export default app;
