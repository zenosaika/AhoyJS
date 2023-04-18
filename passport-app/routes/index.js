var express = require('express');
var router = express.Router();

/* Middleware */
const isAuthen = (req, res, next) => {
  if(!req.session.user){
    res.redirect('/login')
  }
  next()
}

/* GET home page. */
router.get('/', isAuthen, function(req, res, next) {
  res.render('index', { user:req.session.user });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
