mongoose = require('mongoose');
// const passport = require('passport');


//page schema
const userSchema = new mongoose.Schema({
          name: {type: String},
          email: {type: String},
          password: {type: String}


});

// passport-local-mongoose init or use
 // userSchema.plugin(passportLocalMongoose);


// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] }); // you want to add other element , and add after password

const User =  mongoose.model('user', userSchema);

// passport.use(User.createStrategy());
//
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

module.exports = User
