// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
// bodyParser is deprecated and now included in Express
// var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Import the dotenv file
const dotenv = require('dotenv');
// Initiate dotenv to make environment variables available throughout the application
dotenv.config();

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
// Defined routing files
const messageRoutes = require('./server/routes/messages');
const contactRoutes = require('./server/routes/contacts');
const documentRoutes = require('./server/routes/documents');

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data

// This original way is part of the deprecate bodyParser pkg.
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// This way is how you do it now with the bodyParser included in Express
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
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

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, './dist/cms/browser/')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
// Map to the other routes
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);
app.use('/documents', documentRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/cms/browser/index.html'));
});

// establish a connection to the mongo database
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Connection failed.');
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
