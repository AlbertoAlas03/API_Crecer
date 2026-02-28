import dotnev from 'dotenv'
dotnev.config()
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose';
import cors from 'cors'
import router from './routes/index.js'

const app = express();

//settings
const port = process.env.PORT || 3002;
app.set('json spaces', 2);

//mongodb connect
const uri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(uri).then(() => console.log('conexion exitosa :)')).catch(err => console.log('error: ', err));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//routes
app.use(router);

//starting the server
app.listen(port, () => {
    console.log('Server listening on port: ' + port)
})