// define mongoose
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// user schema
var userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: 'First name can\'t be empty'
    },
    
    lastName: {
        type: String,
        required: 'Last name can\'t be empty'
    },
    
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    
    password: {
        type: String, 
        required: 'Password can\'t be empty',
        minlength: [6, 'Password must be atleast 6 characters!'],
        //select: false
    },

    saltSecret: String
});

// Generate salt and hash password
userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        })
    });
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

//Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET || "SECRET#123",
        {
            expiresIn: process.env.JWT_EXP || "10m"
        });
};

// create User model schema
module.exports = mongoose.model('User', userSchema);