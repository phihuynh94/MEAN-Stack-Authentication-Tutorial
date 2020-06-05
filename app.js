// BASE SETUP
// ======================================

require('./server/config/passportConfig'); // include passportConfig.js file

// CALL THE PACKAGES --------------------
var express         = require('express');		// call express
var app             = express(); 				// define our app using express
var bodyParser      = require('body-parser'); 	// get body-parser
var port            = process.env.PORT || 8080; // set the port for our app
var cors            = require('cors');

// call the files
require('./server/models/db');     // call db.js to connect to mongo

// get instance of index router
var rtsIndex = require('./server/routes/index.router');

// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// MIDDLEWARE
//==========================================
app.use('/api', rtsIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

// START THE SERVER
//=====================================
app.listen(port, () => console.log('Server started at port: ' + port));