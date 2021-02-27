const express = require('express');
const router = express.Router();


// home
router.get('/', function(req, res){
  res.render('home')
});

// secrets
router.get('/secrets', function(req, res){
  if(req.isAuthenticated()){
    res.render('secrets');
  }else{
    req.flash('error_msg', 'please log in first')
    res.redirect('users/login');
  }
});


module.exports = router
