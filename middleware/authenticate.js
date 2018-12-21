module.exports.isAuthorized = function (req, res, next) {
  var {
    email,
    password
  } = req.query

  var user = {
    email,
    password
  }
  console.log(user)
  db.query(`SELECT email FROM users WHERE email = '${email}' AND password = '${password}'`, user, function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      req.user = null
      req.auth = false
      res.locals.user = null;
      res.locals.auth = false
      next(err);
    } else {
      if (results.length === 0) {
        res.redirect('/')
      } else {
        console.log('The solution is: ', results);
        var user = results[0].email
        req.user = null
        req.auth = false
        res.locals.user = user;
        res.locals.auth = true
        next()
      }
    }
  })
}