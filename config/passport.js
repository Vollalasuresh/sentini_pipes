var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/userModel');
passport.serializeUser((user, done) => {
    done(null, user.id);

})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})

// console.log("register ebter")

passport.use('local.register', new LocalStrategy({
    usernameField: 'mail_Id',
    passwordField: 'password',
    passReqToCallback: true
}, (req, name, password, done) => {
    console.log("pppp", req.body)
    User.findOne({ mail_Id: req.body.mail_Id }, (err, user) => {
        console.log("in passport", user)
        if (err) {
            console.log(err)
            return done(err)
        }
        if (user) {
            return done(null, false)
        }
        var s = new User();
        s.firstName = req.body.firstName,
            s.lastName = req.body.lastName,
            s.user_Type = req.body.userType,
            s.mail_Id = req.body.mail_Id,
            s.password = s.encryptPassword(req.body.password),
            s.phone = req.body.phone,
            s.city = req.body.city,
            s.state = req.body.state,
            s.pinCode = req.body.pinCode,
            s.address = req.body.address
        s.save((err) => {


            if (err) {
                //console.log(err)
                return done(err)
            }
            return done(null, s)

        })
    })

}))


passport.use('local.login', new LocalStrategy({
    usernameField: 'mail_Id',
    passwordField: 'password',
    passReqToCallback: true
}, (req, name, password, done) => {
    User.findOne({ mail_Id: req.body.mail_Id }, (err, user) => {
        console.log(user)
        //    console.log(user.password)
        if (err) {
            return done(err)
        }
        if (!user) {
            // console.log(loginError)
            return done(null, false)
        }
        if (!user.validPassword(req.body.password, user)) {
            return done(null, false);
        }
        console.log(' from passport user', user)
        return done(null, user);
    })

}))