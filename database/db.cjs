const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {;
        await mongoose.connect("mongodb+srv://gosavimangesh462:0227Namdeo@cluster0.dnjkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        });
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = connectDB;