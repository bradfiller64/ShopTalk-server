"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const models_1 = require("./models");
const app = (0, express_1.default)();
// Set up morgan as middleware to log HTTP requests
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:3001']
};
app.use(cors(corsOptions));
// // routes
// app.use('/messages', messageRoutes)
// app.use('/items', itemRoutes);
// app.use('/users', userRoutes);
// handeling for routes that don't exist
app.use((req, res, next) => {
    res.status(404).end();
});
// Syncing our database
models_1.db.sync().then(() => {
    console.info("----- DATABASE CONNECTION: SUCCESSFUL -----");
});
app.listen(3000);
