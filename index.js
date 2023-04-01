const express = require('express');
const usersRouter = require('./Routers/userRouter');
const productRouter = require('./Routers/productRouter');

require('dotenv').config();
require('./Config/database');
const app = express();

app.use(express.json()); // para poder leer en formato json middenword
app.use(usersRouter);
app.use(productRouter);



app.listen(process.env.PUERTO, () => console.log("Conectado puerto 4000"))

/*
    npm i express dotenv
    npm i uuid
    npm init -y
    npm i express
    npm i dotenv
    npm express dotenv uuid
    */

