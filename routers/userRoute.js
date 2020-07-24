const express = require('express')
const router = express.Router()
const passport = require('passport')
var nexmo = require('nexmo')
const Users = require('../models/userModel')
const { count } = require('../models/userModel');
const e = require('express')
const { compact } = require('lodash')
const axios = require('axios')
var m = require('../models/message')
var requestPromise = require('request-promise')
const { text } = require('body-parser')



//add apiKey and Api Secret
const nx = new nexmo({
    apiKey: '0b9d6f41',
    apiSecret: 'sQJOfIulRcN3G66V'
});

// const tlClient = axios.create({
//     baseURL: "https://api.textlocal.in/",
//     params: {
//         apiKey: "YOUR API KEY", //Text local api key
//         sender: "6 CHARACTER SENDER ID"
//     }
// });
// console.log("txt local", tlClient)
router.get('/', (req, res, next) => {

    Users.find().then((user) => {
        res.send(user)
    })
        .catch(e => console.log(e))
})

// router.post('/saveUser', (req, res, next) => {
//     var data = req.body;
//     if (data.user_Id) {
//         users.update({ user_Id: data.user_Id }, { $set: data }, { new: true }).then((user) => {
//             console.log("Updating", user);
//             res.send("success");
//         }).catch((e) => {
//             console.log(e)
//         })
//     }
//     else {
//         Users.find().then((user) => {
//             var counter = user.length
//             userId = "User-" + counter;

//             console.log("user count", counter)
//             var user = new Users({
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 mail_Id: req.body.mail_Id,
//                 phone: req.body.phone,
//                 city: req.body.city,
//                 state: req.body.state,
//                 pinCode: req.body.pincode,
//                 address: req.body.address,
//                 password: req.body.password,
//                 user_Type: req.body.user_Type,
//                 userId: userId
//             })
//             user.save().then((user) => {
//                 counter = counter + 1;
//                 // console.log("saveuser",user)
//                 res.send(user)
//             }).catch(e => { console.log(e) })
//         }).catch(e => {
//             console.log(e)
//         });
//     }
// })
router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.send({ success: false, message: 'Invalid Credntials' })
        }
        console.log("hhhhhhhh", req.user)

        var token = {
            isloggedIn: res.locals.token.isLoggedIn,
            userId: user._id,
        }
        console.log("logged in user details", req.user)
        return res.send({ token: token })
    })(req, res, next)

})

// router.post('/saveUser',funct (req, res, next), passport.authenticate('local.register', function (err, user, info) {
//     if (err) {
//         return next(err)
//     }
//     if (!user) {
//         return res.send({ success: false, message: "signUp failed" })
//     }
//     return res.send({ success: true, message: 'signup succeeded' });
// }, (req, res, next)))

router.post('/saveUser', function (req, res, next) {
    passport.authenticate('local.register', function (err, user, info) {
        if (err) {
            return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting signup
        if (!user) {
            return res.send({ success: false, message: 'signupfailed' });
        }
        return res.send({ success: true, message: 'signup succeeded' });
    })(req, res, next);
})

router.post('/sendOtp', (req, res) => {


    // message = {
    //     number: "+917989563354",
    //     msg: 123

    // }

    // var sms = requestPromise({
    //     method: 'POST',
    //     uri: 'https://api.textlocal.in/send',
    //     params: {
    //         apiKey: "Oo4nTJbjGP0-lil1xlv09wXnaGEIh24nue8vTB5gJm", //Text local api key
    //         sender: "6 CHARACTER SENDER ID",
    //         number: '+917989563354',
    //         message: "123"
    //     }
    // })
    // console.log("smsm", sms)


    nx.message.sendSms(9951180437, req.body.number, req.body.msg, (err, data) => {
        console.log("nexmo", data)
        if (err) {
            console.log(err);

        }
        else if (data.messages[0].status != '0') {
            console.error(data);
            throw 'Nexmo returned back with non-zero status';
        }
        else {
            sent = new m();
            sent.name = req.body.name;
            sent.number = req.body.number;
            sent.msg = req.body.msg;

            sent.save().then(msd => {
                //sent Message is saved in Database
                console.log("msss", msd)
                res.send(msd)
            }).catch(err => {
                console.log(err);
                res.redirect(err)
            })
        }
    })

})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    }
    res.redirect('/login')

}


module.exports = router
