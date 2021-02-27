// var passport = require('passport');
// var User = require('../models/user');
// var LocalStrategy = require('passport-local').Strategy;
// var mongoose = require('mongoose')
// var bcrypt = require('bcryptjs')
//
// module.exports = function (passport) {
//   passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
//     User.findOne({'email': email}, function (err, user) {
//         if (err) {
//             return (err);
//         }
//         if (!user) {
//             return (null, false, {message: 'Email is not registered.'});
//         }
//         if(user){
//           // Match password
//           bcrypt.compare(password, user.password, function(err, isMatch){
//             if(err) {return done(err);}
//             if(isMatch){
//               {return done(null, user);}
//             }else {
//               return done(null, false, {message: 'password incorect'})
//             }
//           })
//         }
//
//     });
// }));
//
// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });
//
// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });
// }


const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
