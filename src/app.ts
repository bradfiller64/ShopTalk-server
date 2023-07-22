import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan';

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
app.use('/messages', messageRoutes)
app.use('/items', itemRoutes);
app.use('/users', userRoutes);

// handeling for routes that don't exist
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

app.listen(3000);