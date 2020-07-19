const mongoose = require('mongoose')
const prodSchema = new mongoose.Schema({

  prod_Id: {
    type: String,
    // unique: true
  },
  prod_Type: {
    type: String,
    // required: true
  },
  item: {
    type: String,
    // required: true
  },
  size: {
    type: String,
    // required: true
  },
  sku_Code: {
    type: String,
    // required: true
  },
  sku_Description: {
    type: String,
    // required: true
  },
  std_Pkg: {
    type: String,
    // required: true
  },
  price: {
    type: String,
    // required: true
  },
  dealDiscount: {
    type: String,
    // required:true
  },
  disDiscount: {
    type: String,
    // required:true
  },
  sNo: {
    type: Number,
    unique: true

  },
  editHistory: [],
  productImage: {
    type: String
  }


})
const Product = mongoose.model('Product', prodSchema)
module.exports = Product;