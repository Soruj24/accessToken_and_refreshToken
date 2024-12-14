const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const authRouter = require('./router/authRouter');

const app = express();

//! Middleware setup
app.use(cors())
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Redundant but sometimes used for legacy reasons
app.use(cookieParser()); // For parsing cookies
app.use(morgan('dev')); // Logging HTTP requests


app.use('/api/users', userRouter);
app.use('/api/auth', authRouter)


//! 404 Route Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route not found',
    });
});

//! Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log detailed error
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

// Export the app
module.exports = app;
