var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  db.query(`SELECT * FROM users`, function (error, results, fields) {
    if (error) {
      res.render('users', {
        title: "My Empire City Labs Application Challenge",
        users: null,
        message: 'There was an error with the database, please try again'
      })
    } else {
      if (results.length === 0) {
        res.render('users', {
          title: "My Empire City Labs Application Challenge",
          users: null,
          message: 'There are no users yet, please register to add some'
        })
      } else {
        console.log('The solution is: ', results);
        res.render('users', {
          title: "My Empire City Labs Application Challenge",
          users: results,
          message: 'Successful querying for users'
        })
      }
    }
  })
});

module.exports = router;