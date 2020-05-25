var db = require("./models");

// render the sign in page
exports.signUp = function(req, res) {
  res.render("/");
};

exports.register = function(req, res) {
  console.log("here!");
  db.User.find({ where: { email: req.email } }).success(function(user) {
    if (!user) {
      db.User.create({
        email: req.body.userEmail,
        password: req.body.password,
        name: req.body.name,
        age: req.body.userAge,
        sex: req.body.userGender,
        weight: req.body.userWeight,
        goalWeight: req.body.userGoalWeight,
        height: req.body.userHeight
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
    res.redirect("/signup");
  }
  res.redirect("/");
};

exports.IsAuthenticated = function(req, res, next) {
  if (req.IsAuthenticated()) {
    next();
  } else {
    res.redirect("/signup");
  }
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
