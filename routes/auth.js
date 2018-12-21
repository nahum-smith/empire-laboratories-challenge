var express = require('express');
var router = express.Router();
var isAuthorized = require('../middleware/authenticate.js').isAuthorized

router.post('/register', function (req, res, next) {
  var {
    email,
    password
  } = req.body

  var user = {
    email,
    password
  }

  db.query('INSERT INTO users SET ?', user, function (error, results, fields) {
    if (error) {
      res.json({
        "ok": false,
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      res.json({
        "ok": true,
        "code": 200,
        "success": "user registered sucessfully"
      });
    }
  })
});

router.post('/login', function (req, res, next) {
  var {
    email,
    password
  } = req.body

  var user = {
    email,
    password
  }

  db.query(`SELECT email FROM users WHERE email = '${email}' AND password = '${password}'`, user, function (error, results, fields) {
    if (error) {
      res.json({
        auth: false,
        user: null,
        ok: false,
        status: 400,
        message: "Database Error: Please try again"
      })
    } else {
      if (results.length === 0) {
        res.json({
          auth: false,
          user: null,
          ok: false,
          status: 400,
          message: "No User Exists With Those Credentials, please Register"
        })
      } else {
        console.log('The solution is: ', results);
        var user = results[0].email
        res.json({
          ok: true,
          message: "Successfull Login",
          auth: true,
          password: password,
          email: email,
        })
      }
    }
  })
});

module.exports = router;