const express = require('express')
const nodemailer = require('nodemailer');
const router = express.Router()
var _ = require('lodash')
const fs = require('fs')

const Freemarker = require('freemarker');
const freemarker = new Freemarker();
const Cart = require('../models/cartModel');
const { result } = require('lodash');


router.get('/getCart', (req, res, next) => {

    Cart.find({ user_Id: "5ef1723e28c36846cc8968a6" }).then((cart) => {
        console.log("user carts", cart)
        res.send({ cart });

    }).catch((e) => {
        console.log(e);
        res.send(e)
    })
})

router.post('/addToCart', (req, res, next) => {

    console.log("cart user details", req.user)
    console.log("cart sess", res.locals.session)

    var userid = req.userId;
    Cart.find({ user_Id: userid }).then((cart) => {
        cart.products.push(req.body.item)
    })
    var cart = new Cart({
        user_Id: userid,
        products: req.body.products

    })
    cart.save().then((cart) => {
        console.log("cart saved success", cart);
        res.send(cart)
    }).catch((e) => {
        console.log(e);
        res.send(e)
    })
})

router.post('/placeOrder', (req, res) => {
    var body;
    var items = []
    var t = {
        items: req.body.products
    }
    console.log("data", t)
    _.each(t, function (d) {
        items.push({
            sno: d.sNo,
            qty: d.qty,
            price: d.price
        })

    })
    console.log("tttt", t)
    for (var key in t) {
        console.log(key, t[key]);
        if (t[key] == null) {
            t[key] = '';
        }
    }
    var tmpFile = "./tmp/file_" + new Date().getTime() + ".html";
    var template = fs.readFileSync('C:/Users/Dell/piping sol/routers/templates/products.html', 'utf8')

    console.log(" readFileSync", template)
    // freemarker.render(template, t, (err, result) => {
    //     if (err) {
    //         throw new Error(err);
    //     }
    //     console.log("resn", result);
    // });

    var pm = new Promise((resolve, reject) => {
        freemarker.render(template, t, (err, content) => {
            console.log("in render", err)
            if (err) {
                console.log("readerr", err)
                reject(new Error(err));
            }
            console.log("Services :::  parseContent :: content : " + content.length);
            if (content) {
                fs.writeFile(tmpFile, content, 'utf8', function (err) {
                    if (err) reject(err);
                    resolve(tmpFile);
                })
            } else {
                console.log("Services :::  parseContent :: content not rendered  ");
                reject("unable to render freemarker template")
            }
        });
    });
    console.log("pm", pm)
    var transporter
    // pm.then((ab) => {
    //     body = fs.readFileSync(tmpFile, 'utf8');

    //     transporter = nodemailer.createTransport({
    //         host: "smtp.gmail.com",
    //         port: 465,
    //         secure: true,
    //         auth: {
    //             user: "nvtaduri@softility.com",
    //             pass: "Vihari@9406"
    //         }
    //     });
    //     transporter.sendMail({
    //         from: "nvtaduri@softility.com",
    //         to: "taduri.nagarjunavihari@gmail.com",
    //         subject: "Test",
    //         html: body,

    //     }).then((info) => {
    //         return (info)

    //     })
    //         .catch(e => {
    //             throw e
    //         })
    // }).catch(e => {
    //     console.log(e)
    // })

})


module.exports = router

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();

//     }
//     res.send({ success: false, message: "Not Logged IN" })

// }
