//Imports
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');

// Import the dotenv file
const dotenv = require('dotenv');
// Initiate dotenv to make environment variables available throughout the application
dotenv.config();



// Instantiate an express object
const app = express();
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed.');
    });

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use('/api/posts', postRoutes);

module.exports = app;