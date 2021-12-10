var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var user = req.user;
  res.render('index');
});

router.get('/success', (req, res, next) => {
  let user = req.user;
  console.log(user);
  res.render('success', { user });
});

router.get('/failure', (req, res, next) => {
  res.render('failure');
});

// github strategy
router.get('/auth/github', passport.authenticate('github'));
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/failure' }),
  (req, res) => {
    res.redirect('/success');
  }
);

// google strategy
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failure' }),
  function (req, res) {
    res.redirect('/success');
  }
);

// logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
