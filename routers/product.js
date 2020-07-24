const express = require('express')
const router = express.Router()
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')

const products = require('../models/product');
const { count } = require('../models/product');
var user = require('./userRoute')
var request = require('request')
var _ = require('lodash')
var counter;
var prodId
var editHistory = {};
const url = 'mongodb://localhost:27017/pipes'

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
console.log("from storage", storage)
let upload = null;

// storage.on('connection', (db) => {
//     //Setting up upload for a single file

// });
upload = multer({
    storage: storage
});


router.get('/', (req, res, next) => {
    console.log("user details", req.user)

    products.find().sort({ sNo: 1 }).then((prod) => {
        // console.log("user details", prod)
        res.send(prod)
    }).catch(e => console.log(e))
})

router.post('/saveProduct', upload.single('productImage'), (req, res, next) => {
    var data = req.body;

    console.log("saveProduct", data)
    var prod = new products({
        category: data.category,
        // prod_Id: prodId,
        prod_Type: data.prod_Type,
        item: data.item,
        size: data.size,
        sku_Code: data.sku_Code,
        sku_Description: data.sku_Description,
        std_Pkg: data.std_Pkg,
        price: data.price,
        dealDiscount: data.dealDiscount,
        disDiscount: data.disDiscount,
        sNo: data.sno,
        productImage: req.file ? req.file.path : null

    })
    console.log("prod", prod)
    prod.save().then((prod) => {
        // console.log("saveproduct",prod)
        res.send(prod)
    }).catch(e => { console.log(e) })
})

router.get('/productList/:id', (req, res, next) => {
    // console.log("dele", req.params.id)
    // var id = "25"
    products.find({ sNo: req.params.id }).then((data) => {
        console.log("deleted", data)
        res.send(data)
    }).catch((e) => {
        console.log(e)
        res.send(e);
    })
})

router.post('/editProduct', (req, res, next) => {
    var data = req.body

    products.findOne({ sNo: data.sNo }).then((prod) => {
        console.log(prod)

        editHistory = {
            sNo: prod.sNo,
            price: prod.price,
            dealDiscount: prod.dealDiscount,
            disDiscount: prod.disDiscount,
            updated: new Date()
        }
        prod.editHistory.push(editHistory)
        data.editHistory = prod.editHistory
        editHistory = {};

        console.log("ssss", data)
        products.update({ sNo: data.sNo }, { $set: data }, { new: true }).then((prod) => {
            // console.log("Updating", prod);
            res.send(prod);
        }).catch((e) => {
            console.log(e)
            res.send(e);
        })
    }).catch(e => {
        console.log(e)
    })

})
router.post('/uploadImage', upload.single('productImage'), (req, res) => {
    var data = req.body
    products.findOne({ sNo: data.sNo }).then((prod) => {

    }).catch(e => {
        console.log(e)
    })
    data.productImage = req.file.path
    console.log("upload", req.file)
    products.update({ sNo: data.Sno }, { $set: data }, { new: true }).then((prod) => {
        res.send(prod)
    }).catch((e) => {
        res.send(e)
    })
})



module.exports = router
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    }
    res.redirect('/login')

}
