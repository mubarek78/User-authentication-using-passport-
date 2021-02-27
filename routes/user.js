const express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res){
  res.render('register')
});

router.post('/register', function(req, res){
const name = req.body.name
const email = req.body.username
const password = req.body.password
const password2 = req.body.password2
let errors = []

// import DB
const User = require('../models/user')
// check required Fields
if(!name || !email || !password || !password2){
  errors.push({msg: 'please fill in all fields'});
}

// check password mach
if(password !== password2){
  errors.push({msg: 'password do not much'});
}

// check password mach
if(password.length < 6){
  errors.push({msg: 'password must be morthan six characters'});
}

if(errors.length > 0){
  console.log(email)
res.render('register', {
  errors: errors,
  name:name,
  username:email,
  password: password,
  password2: password2
})
}else{
  // validation passed
  User.findOne({email: email}, function(err, user){
    if(err){console.log(err)}
    if(user){
      // user found
      errors.push({msg: 'Email is alredy registered'})
      res.render('register', {
        errors: errors,
        name:name,
        username:email,
        password: password,
        password2: password2
      })
    }else{

      const newuser = new User({
        name: name,
        email: email,
        password: password
      })

       // Hash password
       bcrypt.genSalt(10, function(err, salt){
         bcrypt.hash(newuser.password, salt, function(err, hash){
           if(err){console.log(err)
           }else{
             // set password to Hash
             newuser.password = hash

             // save user
             newuser.save(function(err){
               if(err){console.log(err)
               }else{
                 req.flash('success_msg', 'you are now registered and can log in')
                 res.redirect('/users/login')
               }
             })
           }
         })
       })
    }
  })
}
});

router.get('/login', function(req, res){
  res.render('login')
})



// // Login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/secrets',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/secrets',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.get('/logout', function(req, res){
  req.logout()
  req.flash('success_msg', 'you are loged out')
  res.redirect('/users/login')

})

module.exports = router
