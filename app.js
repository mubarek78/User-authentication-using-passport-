const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const passport = require('passport'); //we dont need to requir passport-local it included in passport
var session = require('express-session');
var flash = require('connect-flash');


var index = require('./routes/index');
var user = require('./routes/user');

var app = express();

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'))


//EJS
app.set('view engine', 'ejs');

//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

// Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global variables fo coloring the message (not clear for me)
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



mongoose.connect('mongodb://localhost:27017/passportproDB',  { useNewUrlParser: true, useUnifiedTopology: true,})
mongoose.set('useCreateIndex', true)
require('./config/passport')(passport)

//requiring routs
app.use('/', index);
app.use('/users', user)

app.listen('3000', function () {
    console.log('port 3000 working')
})
