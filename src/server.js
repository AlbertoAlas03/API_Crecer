import dotnev from 'dotenv'
dotnev.config()
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose';
import cors from 'cors'
import SessionRoutes from './routes/Session.routes.js'
import ChildrenRoutes from './routes/Children.routes.js'
import AttributesChildrenRoutes from './routes/AttributesChildren.routes.js'
import ChangePasswordRoutes from './routes/ChangePassword.routes.js'
import CONSTANTS_TEXT from './config/constants.js';

const app = express();

//settings
const port = process.env.PORT || 3002;
app.set('json spaces', 2);

//mongodb connect
const uri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(uri).then(() => console.log(CONSTANTS_TEXT.connection_success)).catch(err => console.log('error: ', err));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/session/', SessionRoutes);
app.use('/api/children/', ChildrenRoutes);
app.use('/api/attributes-children/', AttributesChildrenRoutes);
app.use('/api/change-password/', ChangePasswordRoutes);

//starting the server
app.listen(port, () => {
    console.log(CONSTANTS_TEXT.server_listening + port)
})