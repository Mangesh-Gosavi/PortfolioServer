const express = require('express');
const connectDB = require('../database/db.cjs');
const userRoutes = require('../routes/userRoute.cjs');
var cors = require('cors')
const bodyParser = require('body-parser'); 
require('dotenv').config();

PORT=3000;

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Connect to the database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'cjs');
app.set('views', './views');

// Routes
app.use('/', userRoutes);

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is started.. ${PORT}`);
  }
});
