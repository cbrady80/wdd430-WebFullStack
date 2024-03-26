// Imports
const http = require('http');
const app = require('./backend/app');
const debug = require('debug')('node-angular');
const { error } = require('console');

// Import the dotenv file
const dotenv = require('dotenv');
// Initiate dotenv to make environment variables available throughout the application
dotenv.config();


// This is a function to check if an env variable for the port # is a valid #.
const normalizePort = val => {
    var port = parseInt(val, 10);

    if(isNaN(port)) {
        //named pipe
        return val;
    }

    if(port >= 0) {
        //port number
        return port;
    }

    return false;
};

// This is to check for errors
const onError = error => {
    if(error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }  
};

// This is a function to log that we are listening to incoming requests.
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
    debug("Listening on " + bind);
};

// // Set up the port # - took out since we added the error handling above.
// const port = process.env.PORT || 3000;
const port = normalizePort(process.env.PORT || "3000");
// To set a configuration for the express env.
app.set("port", port);

// Create a server
const server = http.createServer(app);
// call the error functions
server.on("error", onError);
server.on("listening", onListening);
// Assign a port for the server
server.listen(port);