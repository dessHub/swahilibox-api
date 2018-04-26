
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : {
            type: String,
            index: true
        },
        role         : String,
        password     : String
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// create the model for users and expose it to our app
let User = module.exports = mongoose.model('User', userSchema);


module.exports.getUserByUsername = function(email, callback){

    User.findOne({"local.email":email}, callback);
}