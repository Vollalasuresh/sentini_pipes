const express = require('express');
var nodemailer = require('nodemailer');
const ejs = require("ejs");
var smtpTransport = require('nodemailer-smtp-transport');

const router = express.Router()
var _ = require('lodash')
const fs = require('fs')

const Freemarker = require('freemarker');
const freemarker = new Freemarker();
const Cart = require('../models/cartModel');
const { result } = require('lodash');


router.get('/getCart/:user_Id', (req, res, next) => {

    Cart.find({ user_Id: req.params.user_Id }).then((cart) => {
        console.log("user carts", cart)
        res.send(cart);

    }).catch((e) => {
        console.log(e);
        res.send(e)
    })
})

router.post('/addToCart', (req, res, next) => {

    console.log("products details", req.body)

    var userid = req.body.user_Id;
    Cart.find({ user_Id: userid }).then((carts) => {
        console.log("carts", carts)


        if (carts.length) {
            var prods = carts[0].products

            _.each(prods, (p) => {
                if (p.sNo === req.body.item.sNo) {
                    carts[0].products.push({
                        sNo: req.body.item.sNo,
                        quantity: p.quantity + req.body.item.quantity,
                        price: p.price + req.body.item.price,
                        size: req.body.item.size

                    })



                }
                else {
                    carts[0].products.push(req.body.item)
                    console.log("SS", p)

                }
            })

            console.log("befor up ", carts[0].products)
            Cart.update({ user_Id: req.body.user_Id }, { $set: carts[0] }, { new: true }).then((results) => {
                console.log("Updating", results);
                res.send(results);
            }).catch((e) => {
                console.log(e)
                res.send(e);
            })
            console.log("After pushing item", carts)

        }
        else {
            var cart = new Cart({
                user_Id: userid,

            })
            cart.products.push(req.body.item)

            console.log("else cart", cart)
            cart.save().then((cart) => {
                // console.log("cart saved success", cart);
                res.send(cart)
            }).catch((e) => {
                console.log(e);
                res.send(e)
            })
        }

    })

})

router.post('/placeOrder', (req, res) => {
    var body;
    var items = []
    var t = {
        items: req.body
    }
    console.log("placing order", req.body)
    //console.log("Final ", t)
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', //host of mail service provider
        port: 465,
        secure: true,
        auth: {
            user: 'taduri.nagarjunavihari@gmail.com',
            pass: 'wfbkaouyhqvdeibv'
        }
    });

    ejs.renderFile("./views/products.ejs", { items: t.items }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('==== result')
            var mainOptions = {
                from: 'taduri.nagarjunavihari@gmail.com',
                to: "nvtaduri@softility.com",
                subject: 'Hello, world',
                html: data
            };
            // console.log("html data ======================>", mainOptions.html);
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    // console.log('Message sent: ' + info.response);
                    res.json({
                        response: info.response
                    })
                }
            });
        }
    });
})


module.exports = router

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();

//     }
//     res.send({ success: false, message: "Not Logged IN" })

// }
