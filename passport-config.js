var passport = require("passport")
,   LocalStrategy = require("passport-local").Strategy
,   db = require("./models")

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(user,done){
    db.users.find({where:{email: user.email}}).success(function(user){
        done(null,user);
    }).error(function(err){
        done(err,null);
    });
});

passport.use(new LocalStrategy(
    function(email,password,done){
        db.users.find({where:{email:email}}).success(function(user){
            passwd = user? user.password : ''
            isMatch = db.User.validPassword(password, passwd, done, user)
        });
}));

module.exports = passport;