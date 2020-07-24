const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path');
var cookieParser = require('cookie-parser')
var session = require('express-session');
var passport = require('passport');
var ms = require('connect-mongo')(session);
const flash = require('connect-flash');
const url = 'mongodb://localhost:27017/pipes'
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)))
app.use('/uploads', express.static('uploads'));
app.use(cors())
app.use(cookieParser());
app.use(session({
    secret: 'sec',
    resave: true,
    saveUninitialized: true,
    store: new ms({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 10 }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
require('./config/passport')
app.use((req, res, next) => {
    res.locals.token = {
        isLoggedIn: req.isUnauthenticated(),
        userid: req.user_id
    }


    res.locals.session = req.session
    console.log("App", req.user)
    next();
})

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection

con.on('open', function () {
    console.log('connection made');
});
const productRoute = require('./routers/product');
const userRoute = require('./routers/userRoute');
const cartRoute = require('./routers/cartRoute');
const twofactorRoute = require('./routers/twofactor')
const { json } = require('express');
app.use('/products', productRoute)
app.use('/user', userRoute)
app.use('/cart', cartRoute)
app.use('/tfcheck', twofactorRoute)
app.listen(9000, () => {
    console.log('server started');
})
