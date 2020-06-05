// call the files
require('./user.model');

// define mongoose
var mongoose = require('mongoose');

// this fixed an error with mongoose
mongoose.set('useCreateIndex', true);

// connect to database
mongoose.connect('mongodb://localhost/MeanStackDB',
    // fixed errors with mongoose
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
    // inform if connection to mongodb successed.
    if (!err) {console.log('MongoDB connection successed.');}
    else {console.log('Error in MongoDB connection.');}
});