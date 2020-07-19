const express = require('express')
const Speakeasy = require("speakeasy");
const { request } = require('express');
const router = express.Router()

router.post('/totpsecret', (req, res, next) => {
    var secret = Speakeasy.generateSecret({ length: 20 });
    res.send({ "secret": secret.base32 })
})

router.post('/totpgenerate', (req, res, next) => {
    res.send({
        "token": Speakeasy.time({
            secret: req.body.secret,
            encoding: "base32"
        })
    });
})

router.post('/totpvalidate', (req, res, next) => {
    res.send({
        "valid": Speakeasy.time.verify({
            secret: req.body.secret,
            encoding: "base32",
            token: req.body.token,
            window: 0
        }),
        "remaining time": (60 - Math.floor(new Date().getTime() / 1000.0 % 60))
    });
})

module.exports = router; 