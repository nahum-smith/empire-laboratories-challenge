var express = require('express');
var router = express.Router();
var isAuthorized = require('../middleware/authenticate.js').isAuthorized

router.get('/', function (req, res, next) {
  res.render('index', {
    title: "My Empire City Labs Application Challenge",
    user: null,
    auth: false
  });
});

router.get('/user', isAuthorized, function (req, res, next) {
  var {
    email
  } = req.query
  req.query = {}
  res.render('user', {
    name: email,
    title: "My Empire City Labs Application Challenge",
  })
})


module.exports = router;