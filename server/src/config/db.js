const mongoose = require('mongoose');
const { MONGO_URI } = require('../secret');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
