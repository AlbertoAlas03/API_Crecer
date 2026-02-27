'use strict'
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//settings
const port = process.env.PORT || 3002;
app.set('json spaces', 2);

//mongodb connect
const uri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(uri).then(() => console.log('conexion exitosa')).catch(err => console.log('error: ', err));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//routes
app.use(require('./routes/index'));

//starting the server
app.listen(port, () => {
    console.log('Server listening on port ' + port)
})