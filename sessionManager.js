var db = require("./models");

// render the sign in page
exports.signUp = function(req, res) {
  res.render("/");
};

exports.register = function(req, res) {
  db.User.find({ where: { email: req.email } }).success(function(user) {
    if (!user) {
      db.User.create({
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        sex: req.body.sex,
        weight: req.body.weight,
        goalWeight: req.body.goalWeight,
        height: req.body.height
      }).error(function(err) {
        console.log(err);
      });
    } else {
      res.redirect("/signup");
    }
  });
  res.redirect("/");
};

exports.IsAuthenticated = function(req, res, next) {
  if (req.IsAuthenticated()) {
    next();
  } else {
    next(new Error(401));
  }
};

// eslint-disable-next-line no-unused-vars
exports.destroySession = function(req, res, next) {
  req.logOut();
  req.session.destroy();
  res.redirect("/");
};
