var express = require('express');   // call express
var router = express.Router();      // get an instance of express router

// user controller object
var ctrlUser = require('../controllers/user.controller');

var jwtHelper = require('../config/jwtHelper');

// route for register user
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

// return the router
module.exports = router;