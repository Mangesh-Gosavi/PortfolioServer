const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {;
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = connectDB;