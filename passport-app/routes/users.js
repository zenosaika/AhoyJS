var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt')
const User = require('../models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req, res) => {
  const { name, username, password } = req.body
  if(!name || !username || !password){
    return res.render('register', { message: 'Please try again.' })
  }
  const passwordHash = bcrypt.hashSync(password, 10)
  const user = new User({
    name,
    username,
    password: passwordHash
  })
  await user.save()
  req.session.user = user
  res.render('index', { user })
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if(!username || !password){
    return res.render('login', { message: 'Please try again.' })
  }
  const user = await User.findOne({username})

  if(user){
    const isCorrect = bcrypt.compareSync(password, user.password) 
    if(isCorrect){
      req.session.user = user
      return res.render('index', { user })
    } else {
      return res.render('login', { message: 'Password is not correct.' })
    }
  } else {
    return res.render('login', { message: 'User does not exist.'} )
  }
});

module.exports = router;
