import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan';
import { db } from './models'
import userRoutes from './routes/userRoutes'
import itemRoutes from './routes/itemRoutes'
import messageRoutes from './routes/messageRoutes'
import imageRoutes from './routes/imageRoutes'

const app = express();


// Set up morgan as middleware to log HTTP requests
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:3001']
};
app.use(cors(corsOptions));

// routes
app.use('/images', imageRoutes)
app.use('/messages', messageRoutes)
app.use('/items', itemRoutes);
app.use('/users', userRoutes);

// handeling for routes that don't exist
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

// Syncing our database
db.sync().then(() => {
    console.info("----- DATABASE CONNECTION: SUCCESSFUL -----")
});

app.listen(3000);